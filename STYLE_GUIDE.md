# SDEV Original Platform - Coding Style Guide

This document provides extensive examples of the coding patterns used in the original SDEV PHP platform. All code contributions must follow these patterns exactly.

---

## Table of Contents

1. [PHP Syntax Patterns](#1-php-syntax-patterns)
2. [Database Query Patterns](#2-database-query-patterns)
3. [Error Handling Patterns](#3-error-handling-patterns)
4. [AJAX Endpoint Patterns](#4-ajax-endpoint-patterns)
5. [Template Patterns](#5-template-patterns)
6. [Common Utilities](#6-common-utilities)
7. [Anti-Patterns to Avoid](#7-anti-patterns-to-avoid)

---

## 1. PHP Syntax Patterns

### 1.1 Variable Declaration

```php
// Simple declarations
$items = [];
$listingId = $r['id'];
$wheresql = [];

// Ternary for defaults
$distance = ($distance)?$distance:0.5;
$limit = ($limit>0)?$limit:100;
$type = ($type)?$type:'sale';

// Using pick() for coalesce
$city = pick($loc->cityVerified, $loc->city);
$price = pick($deal->price, $deal->asking_price);
```

### 1.2 Conditional Statements

```php
// Single line - no braces
if(!$id)err("Not found");
if($save)sql("INSERT INTO logs SET data='{$data}'");
if(!$lat || !$lng)err("Missing coordinates");

// Multi-condition single line
if($type && $type != 'all')$wheresql[] = "type='{$type}'";

// Multi-line when complex (rare)
if($filter['polygon']){
    $polygon = json_decode($filter['polygon']);
    $wheresql[] = "ST_Contains(ST_GeomFromText('POLYGON((...))'), POINT(lng, lat))";
}
```

### 1.3 Loops

```php
// One-liner while
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;
while(list($id) = mysql_fetch_array($q))$ids[] = $id;

// One-liner foreach
foreach($items as $item)$formatted[$item->id] = $item;
foreach($rules as $r)if($r['active'])$active[] = $r;

// Multi-line when processing
foreach($items as $i=>$item){
    $items[$i]['data'] = json_decode($item['data']);
    $items[$i]['formatted_price'] = formatCurrency($item['price']);
}
```

### 1.4 Function Definitions

```php
// Simple function
function getItems(){
    // body
}

// With parameters (no type hints)
function formatCurrency($v){
    return ($v<100000)?number_format($v,2):number_format($v,0);
}

// With default parameters
function getDeal($listingId, $cacheOnly=true, $overrideData=false){
    // body
}

// Static class method
static public function getAddressCoordinates($address){
    // body
}
```

### 1.5 Array Operations

```php
// Building arrays
$wheresql = [];
$wheresql[] = "status='active'";
$wheresql[] = "type='{$type}'";

// Array to string
$sql = "WHERE ".implode(" AND ", $wheresql);
$inClause = "IN ('".implode("','", $ids)."')";

// Array filtering
$active = array_filter($items, function($a){ return $a['status']=='active'; });

// Array mapping
$ids = array_map(function($a){ return $a['id']; }, $items);

// Reset to get first element
$first = reset($items);
```

---

## 2. Database Query Patterns

### 2.1 SELECT Queries

```php
// Simple select
$q = mysql_query("SELECT * FROM listings WHERE id='{$id}'");
$r = mysql_fetch_assoc($q);

// Select with conditions
$q = mysql_query("SELECT * FROM filters2 WHERE user_id='{$userId}' AND type='{$type}'");
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;

// Select with dynamic WHERE
$wheresql = [];
$wheresql[] = "m.timestamp BETWEEN '{$date1} 00:00:00' AND '{$date2} 23:59:59'";
$wheresql[] = "m.last_deal_cache IS NOT NULL";
if($filter['type'])$wheresql[] = "m.type='{$filter['type']}'";
if($filter['source'])$wheresql[] = "m.source IN ('".implode("','",$filter['source'])."')";

$q = mysql_query("SELECT * FROM listings AS m WHERE ".implode(" AND ",$wheresql)." LIMIT {$limit}");
```

### 2.2 INSERT Queries

```php
// Simple insert
sql("INSERT INTO filters2 SET user_id='{$userId}', type='{$type}', title='{$title}'");

// Insert with JSON data
$data = mysql_real_escape_string(json_encode($_REQUEST['data']));
sql("INSERT INTO items SET data='{$data}'");

// Dynamic insert
$updatesql = [];
foreach($item as $k=>$v)$updatesql[] = "`$k`='".mysql_real_escape_string($v)."'";
sql("INSERT INTO listings SET ".implode(",",$updatesql));
```

### 2.3 UPDATE Queries

```php
// Simple update
sql("UPDATE filters2 SET data='{$data}' WHERE id='{$id}'");

// Update with multiple fields
sql("UPDATE listings SET status='{$status}', updated=NOW() WHERE id='{$id}'");

// Conditional update
if($id){
    sql("UPDATE items SET data='{$data}' WHERE id='{$id}'");
}
else{
    sql("INSERT INTO items SET data='{$data}'");
}
```

### 2.4 UPSERT Pattern

```php
// INSERT ... ON DUPLICATE KEY UPDATE
mysql_query("INSERT INTO deals_data SET status='{$status}', listing_id='{$id}' ON DUPLICATE KEY UPDATE status='{$status}'");
```

### 2.5 DELETE Queries

```php
sql("DELETE FROM filters2 WHERE id='{$id}'");
sql("DELETE FROM items WHERE user_id='{$userId}' AND type='{$type}'");
```

### 2.6 Distance Calculations (Haversine)

```php
// Inline haversine formula
$sql = "
    SELECT m.*,
    (((acos(sin(({$lat}*pi()/180)) * sin((m.lat*pi()/180))+
    cos(({$lat}*pi()/180)) * cos((m.lat*pi()/180)) *
    cos((({$lng} - m.lng)*pi()/180))))*180/pi())*60*1.1515) AS distance
    FROM listings AS m
    WHERE status='active'
    HAVING distance < {$radius}
    ORDER BY distance ASC
";
```

---

## 3. Error Handling Patterns

### 3.1 Input Validation

```php
// Required field checks
if(!$id)err("ID is required");
if(!$title)err("Title is required");
if(!$lat || !$lng)err("Missing coordinates");

// Type checks
if(!is_numeric($limit))err("Invalid limit");

// Multiple requirements
if(!$_REQUEST['filter'])err("No filters detected");
if(!$_REQUEST['filter']['type'])err("Type is required");
```

### 3.2 Error Responses

```php
// JSON error
err("Filter not found!");          // {"error":"Filter not found!"}
err("Missing required field");     // {"error":"Missing required field"}

// With SQL error check
$error = mysql_error();
if($error)err($error);
```

### 3.3 Success Responses

```php
// Simple success
json();                            // {"success":"ok"}
json(['success'=>'ok']);           // {"success":"ok"}

// Success with data
json(['items'=>$items]);
json(['id'=>mysql_insert_id()]);
json(['count'=>count($items), 'items'=>$items]);

// Using sql() helper (auto success)
sql("INSERT INTO items SET data='{$data}'");  // {"success":"ok"}
```

---

## 4. AJAX Endpoint Patterns

### 4.1 Dispatcher Pattern

```php
<?php
// At top of file, load helpers
uselib('deal');
usehelper("ajax::dispatch");

// Functions are called via $_REQUEST['action']
function getItems(){
    // ... implementation
}

function saveItem(){
    // ... implementation
}

function deleteItem(){
    // ... implementation
}
```

### 4.2 Complete AJAX Endpoint Example

```php
<?php
uselib('deal');
usehelper("ajax::dispatch");

function getListings(){
    $filter = $_REQUEST['filter'];
    $limit = pick($_REQUEST['limit'], 100);
    $offset = pick($_REQUEST['offset'], 0);

    $wheresql = [];
    $wheresql[] = "status='active'";

    if($filter['type'] && $filter['type'] != 'all'){
        $wheresql[] = "type='{$filter['type']}'";
    }

    if($filter['date']){
        $dates = explode(' - ', $filter['date']);
        $wheresql[] = "timestamp BETWEEN '".dbDate($dates[0])."' AND '".dbDate($dates[1])."'";
    }

    if($filter['minPrice']){
        $wheresql[] = "price >= {$filter['minPrice']}";
    }

    $items = [];
    $q = mysql_query("SELECT SQL_CALC_FOUND_ROWS * FROM listings WHERE ".implode(" AND ",$wheresql)." LIMIT {$offset},{$limit}");
    while($r = mysql_fetch_assoc($q)){
        $r['data'] = json_decode($r['data']);
        $items[] = (object)$r;
    }

    $total = mysql_fetch_assoc(mysql_query("SELECT FOUND_ROWS() AS total"))['total'];

    json(['items'=>$items, 'total'=>$total]);
}

function saveListing(){
    $id = $_REQUEST['id'];
    $data = mysql_real_escape_string(json_encode($_REQUEST['data']));
    $title = mysql_real_escape_string($_REQUEST['title']);

    if(!$title)err("Title is required");

    if($id){
        sql("UPDATE listings SET title='{$title}', data='{$data}' WHERE id='{$id}'");
    }
    else{
        sql("INSERT INTO listings SET title='{$title}', data='{$data}', created=NOW()");
    }
}

function deleteListing(){
    $id = $_REQUEST['id'];
    if(!$id)err("Listing not found");
    sql("DELETE FROM listings WHERE id='{$id}'");
}
```

---

## 5. Template Patterns

### 5.1 PHTML Structure

```php
<style>
    .page-container { padding: 20px; }
    .item-card { border: 1px solid #ddd; margin: 10px 0; }
</style>

<div class="page-container">
    <form id="filter-form">
        <div class="row">
            <div class="col-sm-4">
                <select class="form-control" name="filter[type]">
                    <option value="">All types...</option>
                    <option value="sale">Sale</option>
                    <option value="lease">Lease</option>
                </select>
            </div>
        </div>
    </form>

    <div id="results"></div>
</div>

<script id="template-item" type="x-handlebars">
    <div class="item-card" data-id="{{id}}">
        <h4>{{title}}</h4>
        <p>{{description}}</p>
        {{#xIf status '==' 'active'}}<span class="badge badge-success">Active</span>{{/xIf}}
    </div>
</script>

<script>
$(function(){
    // Page init code
});
</script>
```

### 5.2 PHP in Templates

```php
// Short echo tags
<input value="<?=$item->title?>">
<span><?=formatCurrency($item->price)?></span>

// Loops with alternative syntax
<? foreach($items as $item): ?>
    <option value="<?=$item->id?>"><?=$item->name?></option>
<? endforeach; ?>

// Conditionals
<? if($showButton): ?>
    <button class="btn btn-primary">Save</button>
<? endif; ?>

// Commented code (for reference)
<?/*<option value="test">Test Option</option>*/?>
```

---

## 6. Common Utilities

### 6.1 Date Functions

```php
// Database date format
$date = dbDate('today');                    // 2024-01-15
$date = dbDate('-7 days');                  // 2024-01-08
$date = dbDate($userInput);                 // Formatted from input

// Database timestamp format
$ts = dbTimestamp('now');                   // 2024-01-15 10:30:00
$ts = dbTimestamp($userInput);              // Formatted from input

// Display formatting
$display = date('m/d/Y', strtotime($dbDate));
$display = date('M j, Y', strtotime($dbDate));
```

### 6.2 String/Number Formatting

```php
// Currency formatting
$display = formatCurrency(1500000);         // 1,500,000
$display = formatCurrency(1234.56);         // 1,234.56

// Strip non-numeric
$price = preg_replace("/[^0-9\.]/", "", $input);
$clean = preg_replace("/[^0-9\.-]/", "", $val);

// Number formatting
$display = number_format($value, 2);        // 1,234.56
$display = number_format($value, 0);        // 1,235
```

### 6.3 Debug Function

```php
// Print and continue
t($variable);

// Print and die
t($variable, 1);

// In queries (commented)
//t($sql);
//t($result, 1);
```

---

## 7. Anti-Patterns to Avoid

### 7.1 DO NOT Use Modern PHP Features

```php
// WRONG - type hints
function getItems(array $filter): array {
    return [];
}

// CORRECT
function getItems(){
    $filter = $_REQUEST['filter'];
    return [];
}
```

### 7.2 DO NOT Use Verbose Conditionals

```php
// WRONG
if (!$id) {
    err("Not found");
}

// CORRECT
if(!$id)err("Not found");
```

### 7.3 DO NOT Use Namespaces

```php
// WRONG
namespace App\Services;
use App\Models\Deal;

// CORRECT
uselib('deal');
```

### 7.4 DO NOT Use Prepared Statements

```php
// WRONG
$stmt = $pdo->prepare("SELECT * FROM items WHERE id = ?");
$stmt->execute([$id]);

// CORRECT (legacy pattern)
$q = mysql_query("SELECT * FROM items WHERE id='{$id}'");
```

### 7.5 DO NOT Over-Comment

```php
// WRONG
/**
 * Gets all items from the database
 * @param array $filter Filter options
 * @return array List of items
 */
function getItems($filter) {
    // Initialize empty array for results
    $items = [];
    // Build the query
    // ...
}

// CORRECT
function getItems(){
    $filter = $_REQUEST['filter'];
    $items = [];
    // ... code is self-explanatory
}
```

### 7.6 DO NOT Abstract Unnecessarily

```php
// WRONG - Creating interfaces/base classes
interface ItemRepositoryInterface {
    public function find($id);
    public function save($data);
}

class ItemRepository implements ItemRepositoryInterface {
    // ...
}

// CORRECT - Direct implementation
function getItem(){
    $id = $_REQUEST['id'];
    $q = mysql_query("SELECT * FROM items WHERE id='{$id}'");
    json(['item'=>mysql_fetch_assoc($q)]);
}
```

### 7.7 DO NOT Use Dependency Injection

```php
// WRONG
class DealService {
    public function __construct(
        private GmapsService $gmaps,
        private ZillowService $zillow
    ) {}
}

// CORRECT
Class Deal {
    public function __construct(){
        $this->gmaps = new Gmaps();
        $this->zillow = new Zillow();
    }
}
```

---

## Quick Reference Card

| Pattern | Example |
|---------|---------|
| Error check | `if(!$id)err("Not found");` |
| Default value | `$limit = ($limit)?$limit:100;` |
| Coalesce | `$val = pick($a, $b);` |
| Build WHERE | `$wheresql[] = "field='{$val}'";` |
| Join WHERE | `implode(" AND ", $wheresql)` |
| IN clause | `"IN ('".implode("','", $arr)."')"` |
| Fetch loop | `while($r = mysql_fetch_assoc($q))$items[] = (object)$r;` |
| JSON response | `json(['items'=>$items]);` |
| SQL with success | `sql("INSERT INTO...");` |
| Cast to object | `$r = (object)$r;` |
| Debug | `t($var);` or `t($var, 1);` |
