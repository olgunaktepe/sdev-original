# Fix: ListingsDev Server-Side Pagination

**Date:** 2024-12-23

**Status:** Implemented

**File(s):**
- `/src/php/listingsDev.php`
- `/src/js/listingsDev.js`
- `/src/template/listingsDev/index.phtml`

**Commits:**
- `5531b941` Add server-side pagination with Load More button for listingsDev
- `d4e6f3aa` Fix: Add hasMore to listingsStats for Load More button

---

### Problem

Loading listings with large date ranges (30+ days) causes page timeout/slowness because all results (up to 15,000+) are loaded at once into memory.

### Root Cause

The `getLocations()` function loads all matching listings in a single request without any pagination, consuming excessive memory and causing PHP timeout on large datasets.

### Solution

Added server-side pagination with 1,000-item batches and a "Load More" button. Sorting is also server-side to ensure correct ordering across all data.

---

### Code Changes

#### File: `/src/php/listingsDev.php`

**Added new function `getLocationsPaginated()` after line 653:**

```php
function getLocationsPaginated(){
    ini_set('memory_limit', '512M');
    global $dl;

    $bm = [];

    $filter = $_REQUEST['filter'];
    $page = (int)$_REQUEST['page'];
    $perpage = (int)$_REQUEST['perpage'];
    $sortCol = $_REQUEST['sortCol'];
    $sortDir = $_REQUEST['sortDir'];

    if(!$page)$page = 0;
    if(!$perpage)$perpage = 1000;
    if($perpage>2000)$perpage = 2000;
    if(!$sortDir || ($sortDir != 'asc' && $sortDir != 'desc'))$sortDir = 'desc';

    $sortMap = [
        'created_on' => 'm.timestamp',
        'timestamp' => 'm.timestamp',
        'title' => 'm.title',
        'price' => 'm.price',
        'sqft' => 'm.sqft',
        'address' => 'm.address',
        'city' => 'm.city'
    ];
    $orderby = ($sortCol && $sortMap[$sortCol])?$sortMap[$sortCol].' '.strtoupper($sortDir):'m.timestamp DESC';

    $offset = $page * $perpage;
    $limit = $perpage + 1;

    // Uses existing loadLocations() with limit/offset/orderby
    $locations = $dl->loadLocations($filter, $limit, $offset, $orderby);

    $hasMore = false;
    if(count($locations['items']) > $perpage){
        $hasMore = true;
        array_pop($locations['items']);
        array_pop($locations['formatted']);
    }

    json([
        'items'=>[],
        'formatted'=>$locations['formatted'],
        'bm'=>$bm,
        'page'=>$page,
        'perpage'=>$perpage,
        'hasMore'=>$hasMore,
        'sortCol'=>$sortCol,
        'sortDir'=>$sortDir
    ]);
}
```

#### File: `/src/js/listingsDev.js`

**Line 136 - Added pagination state:**

```javascript
var paginationState = {page: 0, perpage: 1000, hasMore: true, loading: false, sortCol: 'created_on', sortDir: 'desc'};
```

**Line 1011 - Added hasMore to listingsStats:**

```javascript
listingsStats = {'total': listingIds.length, 'chunks': listingIdsChunked.length, 'chunkSize': size, 'maxThreads': maxThreads,'valid':0, 'invalid':0, 'err':0, 'err_valid':0,'speed': 0, 'hasMore': paginationState.hasMore};
```

**Line 1266 - Modified sortListings for server-side sorting:**

```javascript
function sortListings(header){
    if(!header)return false;
    if(header == 'default'){
        paginationState.sortCol = 'created_on';
        paginationState.sortDir = 'desc';
    }
    else{
        var col = header.attr('data-sort');
        var dir = (header.hasClass('dir-d'))?'asc':'desc';
        paginationState.sortCol = col;
        paginationState.sortDir = dir;
        container.find(selectors.listingsSort).removeClass('dir-d dir-u');
        header.addClass((dir == 'desc')?'dir-d':'dir-u');
    }
    searchParams = '';
    search();
}
```

**Line 1455 - Modified search() to use paginated endpoint:**

```javascript
data.action = 'getLocationsPaginated';
data.page = 0;
data.perpage = paginationState.perpage;
data.sortCol = paginationState.sortCol;
data.sortDir = paginationState.sortDir;
```

**Added loadMoreLocations() function:**

```javascript
function loadMoreLocations(){
    if(!paginationState.hasMore || paginationState.loading)return;
    paginationState.loading = true;
    paginationState.page++;

    var data = getFilter();
    data.action = 'getLocationsPaginated';
    data.page = paginationState.page;
    data.perpage = paginationState.perpage;
    data.sortCol = paginationState.sortCol;
    data.sortDir = paginationState.sortDir;

    $.ajax({
        url: '/index.php/listingsDev/api',
        type: 'POST',
        data: data,
        dataType: 'json'
    }).done(function(json){
        paginationState.hasMore = json.hasMore;
        paginationState.loading = false;
        // Append new items to listings array
        // Update stats display
    });
}
```

#### File: `/src/template/listingsDev/index.phtml`

**Modified stats template to include Load More button:**

```html
<script id="template-stats" type="x-handlebars">
    <div class="col-sm-12">
        <div><b>Total Loaded: {{total}}</b> {{#if hasMore}}<button class="btn btn-sm btn-primary load-more-btn ml-2">Load More</button>{{/if}}</div>
        ...
    </div>
</script>
```

---

### Testing

1. Navigate to ListingsDev page
2. Select a 30+ day date range
3. Verify first 1,000 listings load without timeout
4. Verify "Load More" button appears
5. Click "Load More" - verify next batch loads and appends
6. Click a sort column (e.g., Price) - verify data reloads with new sort order
7. Click "Load More" after sorting - verify continued loading in sorted order

### Behavior Notes

- **Sorting:** Server-side - clicking sort column reloads from server with ORDER BY
- **Client-side filters (valid/invalid toggles):** Only affect currently loaded items
- **Search filters (date, type, source):** Server-side - trigger fresh search

---

### Reviewer Notes

_To be filled by original developer during review_

- [ ] Code style matches existing patterns
- [ ] Fix is minimal and focused
- [ ] No unnecessary changes
- [ ] Tested and working
