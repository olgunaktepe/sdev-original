# Code Rules - Strict Enforcement

These rules are non-negotiable. Code that violates ANY rule will be rejected.

---

## FORBIDDEN - Instant Rejection

### Modern PHP Features

```php
// ALL OF THESE ARE FORBIDDEN

// Type hints - NO
function getItems(array $filter): array { }
function save(int $id, string $data): bool { }

// Namespaces - NO
namespace App\Services;
use App\Models\Deal;

// Null coalescing assignment - NO
$value ??= 'default';

// Nullsafe operator - NO
$name = $user?->profile?->name;

// Arrow functions - NO
$ids = array_map(fn($item) => $item->id, $items);

// Match expressions - NO
$result = match($type) {
    'sale' => 'For Sale',
    'lease' => 'For Lease',
    default => 'Unknown',
};

// Named arguments - NO
createItem(title: 'Test', status: 'active');

// Attributes - NO
#[Route('/api/items')]
public function index() { }

// Constructor property promotion - NO
public function __construct(
    private string $name,
    private int $id
) { }
```

### Verbose Syntax

```php
// FORBIDDEN - verbose conditionals
if (!$id) {
    err("Not found");
}

// CORRECT
if(!$id)err("Not found");


// FORBIDDEN - verbose loops
while ($r = mysql_fetch_assoc($q)) {
    $items[] = (object)$r;
}

// CORRECT
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;


// FORBIDDEN - extra spaces
if ( $condition ) { }
function getName ( $id ) { }

// CORRECT
if($condition){ }
function getName($id){ }
```

### Exception Handling

```php
// FORBIDDEN
try {
    $result = riskyOperation();
} catch (Exception $e) {
    return ['error' => $e->getMessage()];
}

// CORRECT
$result = riskyOperation();
if(!$result)err("Operation failed");
```

### Prepared Statements

```php
// FORBIDDEN
$stmt = $pdo->prepare("SELECT * FROM items WHERE id = ?");
$stmt->execute([$id]);
$item = $stmt->fetch();

// CORRECT
$q = mysql_query("SELECT * FROM items WHERE id='{$id}'");
$item = mysql_fetch_assoc($q);
```

---

## FORBIDDEN - Over-Engineering

### Interfaces & Abstract Classes

```php
// FORBIDDEN
interface ItemRepositoryInterface {
    public function find($id);
    public function save($data);
}

abstract class BaseService {
    abstract protected function process();
}
```

### Dependency Injection

```php
// FORBIDDEN
class DealService {
    public function __construct(
        private DatabaseConnection $db,
        private CacheService $cache,
        private LoggerInterface $logger
    ) { }
}

// CORRECT
Class Deal {
    public function __construct(){
        $this->db = new Database();
        $this->cache = new Cache();
    }
}
```

### Factory Patterns

```php
// FORBIDDEN
class ItemFactory {
    public static function create($type) {
        return match($type) {
            'sale' => new SaleItem(),
            'lease' => new LeaseItem(),
        };
    }
}
```

### Service Layers

```php
// FORBIDDEN
class ItemService {
    public function __construct(
        private ItemRepository $repo,
        private ItemValidator $validator
    ) { }

    public function create(ItemDTO $dto): Item { }
}
```

### DTOs / Value Objects

```php
// FORBIDDEN
class CreateItemDTO {
    public function __construct(
        public readonly string $title,
        public readonly float $price,
        public readonly string $type
    ) { }
}

// CORRECT - just use arrays
$data = ['title' => $title, 'price' => $price, 'type' => $type];
```

---

## FORBIDDEN - Excessive Comments

```php
// FORBIDDEN - PHPDoc blocks
/**
 * Gets all items from the database
 *
 * @param array $filter Filter options
 * @param int $limit Maximum items to return
 * @return array List of items
 * @throws Exception If database error occurs
 */
function getItems($filter, $limit = 100) { }

// CORRECT - no PHPDoc needed
function getItems(){
    $filter = $_REQUEST['filter'];
    // ... self-explanatory code
}


// FORBIDDEN - excessive inline comments
function processItems(){
    // Initialize the items array
    $items = [];

    // Build the where clause
    $wheresql = [];

    // Add the status condition
    $wheresql[] = "status='active'";

    // Execute the query
    $q = mysql_query(...);

    // Loop through results
    while($r = mysql_fetch_assoc($q)){
        // Add to items array
        $items[] = $r;
    }

    // Return JSON response
    json(['items'=>$items]);
}

// CORRECT - minimal comments
function processItems(){
    $items = [];
    $wheresql = [];
    $wheresql[] = "status='active'";

    $q = mysql_query("SELECT * FROM items WHERE ".implode(" AND ",$wheresql));
    while($r = mysql_fetch_assoc($q))$items[] = (object)$r;

    json(['items'=>$items]);
}
```

---

## REQUIRED - Correct Patterns

### Error Handling

```php
// Use err() for validation
if(!$id)err("ID required");
if(!$title)err("Title required");
if(!$lat || !$lng)err("Coordinates required");

// Use json() for success responses
json(['items'=>$items]);
json(['id'=>mysql_insert_id()]);

// Use sql() for simple queries
sql("INSERT INTO items SET data='{$data}'");
sql("UPDATE items SET status='active' WHERE id='{$id}'");
```

### Query Building

```php
// Array accumulation pattern
$wheresql = [];
$wheresql[] = "status='active'";
if($filter['type'])$wheresql[] = "type='{$filter['type']}'";
if($filter['date'])$wheresql[] = "date >= '{$filter['date']}'";

// Join with AND
$sql = "SELECT * FROM items WHERE ".implode(" AND ",$wheresql);

// IN clause
$wheresql[] = "id IN ('".implode("','",$ids)."')";
```

### Default Values

```php
// Ternary pattern
$limit = ($limit)?$limit:100;
$offset = ($offset)?$offset:0;
$type = ($type)?$type:'sale';

// Or use pick() helper
$city = pick($loc->cityVerified, $loc->city);
$price = pick($item->price, $item->asking_price);
```

### Loops

```php
// One-liner fetch loops
while($r = mysql_fetch_assoc($q))$items[] = (object)$r;
while(list($id) = mysql_fetch_array($q))$ids[] = $id;

// One-liner foreach
foreach($items as $item)$formatted[$item->id] = $item;
foreach($rules as $r)if($r['active'])$active[] = $r;
```

### Casting

```php
// Cast to object
$r = (object)$r;
$items[] = (object)$r;

// JSON for data fields
$r['data'] = json_decode($r['data']);
$escaped = mysql_real_escape_string(json_encode($data));
```

---

## Complexity Limits

| Metric | Maximum |
|--------|---------|
| New functions per fix | 1 |
| Lines changed | 20 |
| New files | 0 (prefer editing existing) |
| New classes | 0 |
| Comments per function | 2-3 |
| Nesting depth | 3 levels |

---

## Summary

| Category | Rule |
|----------|------|
| PHP Version | Write for PHP 5.x/7.x compatibility |
| Syntax | Compact, single-line where possible |
| Conditionals | `if(!$x)err("msg");` |
| Loops | `while($r = ...)$items[] = $r;` |
| Errors | Use `err()`, `json()`, `sql()` helpers |
| Queries | String interpolation, no prepared statements |
| Comments | Minimal, only when necessary |
| Classes | Only for complex entities, not utilities |
| Abstractions | None - direct implementation only |
