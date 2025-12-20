# SDEV Original Platform - Code Fix Agent

## Purpose

This agent suggests **small, focused fixes** for the original SDEV PHP platform. All code must match the exact style and patterns used by the original developer.

**Repository:** https://github.com/olgunaktepe/sdev-original

---

## Prime Directive

**Write code exactly as the original developer would.** No AI bloat. No over-engineering. No modern PHP patterns that don't exist in the codebase.

The original developer values:
- Simplicity over abstraction
- Direct approaches over clever solutions
- Working code over "clean" code
- Minimal changes that solve the problem

---

## Code Style Requirements

### 1. Naming Conventions

```php
// Variables - camelCase
$listingId = $r['id'];
$mainImage = '';
$wheresql = [];

// Functions - camelCase, action-first
function getItems()
function saveFilter()
function formatCurrency($v)

// Classes - PascalCase, simple names
Class Deal { }
Class Users { }

// Database fields - snake_case
$r['remote_id']
$r['last_deal_cache']
```

### 2. File Organization

```
*.lib.php    - Class libraries (goes in /php/lib/)
*.util.php   - Utility/background scripts (goes in /php/util/)
*.phtml      - Templates (goes in /template/)
*.php        - Page controllers (goes in /php/)
```

### 3. Single-Line Conditionals

```php
// CORRECT - compact style
if(!$id)err("Filter not found");
if(!$title)err("Title is required");
if($overwriteId)sql("UPDATE filters2 SET data='{$data}' WHERE id='{$overwriteId}'");

// WRONG - verbose style
if (!$id) {
    err("Filter not found");
}
```

### 4. Compact Loops

```php
// CORRECT
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;
foreach($items as $item)$formatted[$item->id] = $item;

// WRONG
while ($r = mysql_fetch_assoc($q)) {
    $items[] = (object)$r;
}
```

### 5. SQL Query Building

```php
// CORRECT - array accumulation pattern
$wheresql = [];
$wheresql[] = "status='active'";
if($filter['type'])$wheresql[] = "type='{$filter['type']}'";
if($filter['source'])$wheresql[] = "source IN ('".implode("','",$filter['source'])."')";

$sql = "SELECT * FROM listings WHERE ".implode(" AND ",$wheresql);

// WRONG - StringBuilder or query builder patterns
```

### 6. Error Handling

```php
// CORRECT - use err() helper
if(!$id)err("Item not found!");
if(!$lat || !$lng)err("Missing coordinates!");

// For AJAX success
json(['items'=>$items]);

// For simple SQL operations
sql("INSERT INTO items SET data='{$data}'");
```

### 7. Ternary Operators

```php
// CORRECT
$distance = ($distance)?$distance:0.5;
$limit = ($limit>0)?"LIMIT {$offset}, {$limit}":'';

// Also use pick() helper for coalesce
$city = pick($locationData->cityVerified, $locationData->city);
```

### 8. Object/Array Handling

```php
// Cast to object
$r = (object)$r;
$items[] = (object)$r;

// JSON for data fields
$r['data'] = json_decode($r['data']);
$data = mysql_real_escape_string(json_encode($_REQUEST['data']));
```

---

## DO NOT

1. **No namespaces** - The codebase doesn't use them
2. **No type hints** - `function save(int $id)` is wrong
3. **No return types** - `function get(): array` is wrong
4. **No prepared statements** - Use string interpolation (legacy code)
5. **No excessive comments** - Only when absolutely necessary
6. **No dependency injection** - Instantiate directly
7. **No modern PHP** - No `match`, `?->`, `??=`, etc.
8. **No verbose error messages** - Keep them short
9. **No unnecessary validation** - Trust internal code
10. **No abstractions** - No base classes, interfaces, traits

---

## Helper Functions Available

The codebase has these helpers - use them:

```php
err($msg)           // Return JSON error and exit
json($data)         // Return JSON response
sql($query)         // Execute SQL with error handling
pick($a, $b)        // Return first non-empty value
t($var, $die=0)     // Debug print (like var_dump)
dbDate($str)        // Format date for database
dbTimestamp($str)   // Format timestamp for database
formatCurrency($v)  // Format number as currency
uselib('deal')      // Load a library class
usehelper('ajax::dispatch')  // Load helper
```

---

## Code Template

When writing new functionality, follow this structure:

```php
<?php
uselib('deal');
usehelper("ajax::dispatch");

function getItems(){
    $filter = $_REQUEST['filter'];
    $limit = 1000;

    if(!$filter['id'])err("ID is required!");

    $wheresql = [];
    $wheresql[] = "status='active'";
    if($filter['type'])$wheresql[] = "type='{$filter['type']}'";

    $items = [];
    $q = mysql_query("SELECT * FROM items WHERE ".implode(" AND ",$wheresql)." LIMIT {$limit}");
    while($r = mysql_fetch_assoc($q)){
        $r['data'] = json_decode($r['data']);
        $items[] = (object)$r;
    }

    json(['items'=>$items]);
}

function saveItem(){
    $id = $_REQUEST['id'];
    $data = mysql_real_escape_string(json_encode($_REQUEST['data']));

    if($id){
        sql("UPDATE items SET data='{$data}' WHERE id='{$id}'");
    }
    else{
        sql("INSERT INTO items SET data='{$data}'");
    }
}

function removeItem(){
    $id = $_REQUEST['id'];
    if(!$id)err("Item not found!");
    sql("DELETE FROM items WHERE id='{$id}'");
}
```

---

## Fix Proposal Format

When proposing fixes, structure them as:

### Fix Title

**File:** `/path/to/file.php`

**Problem:** One sentence describing the issue.

**Solution:** One sentence describing the fix.

**Code Change:**
```php
// BEFORE
$old = 'code';

// AFTER
$new = 'code';
```

**Testing:** How to verify the fix works.

---

## Code Review Process

All code must pass review before being shared with the original developer.

### Slash Commands

| Command | Purpose |
|---------|---------|
| `/propose-fix [issue]` | Create a fix proposal |
| `/review-code [code]` | Review code for compliance |
| `/document-fix [fix-name]` | Create GitHub PR for approved fix |
| `/deploy-fix [PR-number]` | Deploy to Railway test server |

### Review Criteria

Code is **REJECTED** if it contains:
- Type hints, return types, or namespaces
- Verbose multi-line conditionals or loops
- Try-catch blocks or thrown exceptions
- Prepared statements or query builders
- Interfaces, abstract classes, or traits
- Dependency injection patterns
- PHPDoc blocks or excessive comments
- Any modern PHP features (match, ?->, ??=, fn=>)

See `RULES.md` for the complete rejection checklist.

### Workflow

1. **Propose** - Use `/propose-fix` to create a fix
2. **Review** - Use `/review-code` to check compliance
3. **Fix** - Address any violations
4. **Re-review** - Confirm all issues resolved
5. **Document** - Use `/document-fix` to create GitHub PR
6. **Deploy** - Use `/deploy-fix` to push to Railway test server
7. **Share** - Share PR link with original developer

### Railway Test Environment

**URL:** https://sdev-original-test.up.railway.app

Test fixes on Railway before sharing with the original developer:
```bash
# Deploy current main branch
/deploy-fix

# Deploy specific PR
/deploy-fix 5

# Check status
/deploy-fix status
```

---

## What This Agent Does NOT Do

- Does not access or reference the new Next.js platform
- Does not store sensitive API keys or credentials
- Does not include project management documentation
- Does not create comprehensive features (only small fixes)
- Does not modify database schema (only queries)
