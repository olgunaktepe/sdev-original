# Fix: Freeze First 3 Columns & Reduce Title Width

**Date:** 2024-12-20

**Status:** Implemented

**File(s):** `/src/template/listings2/index.phtml`

---

### Problem

When scrolling horizontally, the Title, Image, and Address columns scroll away, making it hard to identify listings. Also, excessive width on Title column creates dead space.

### Root Cause

No sticky positioning on columns, and Title column has fixed 260px width that's too wide.

### Solution

Add CSS for sticky positioning on first 3 columns and reduce Title width from 260px to 200px.

---

### Code Changes

**File:** `/src/template/listings2/index.phtml`

**Change 1: Add CSS after line 20 (end of existing style block, before `</style>`)**

```css
// BEFORE (lines 18-21)
	  #query-builder .group-conditions .btn.disabled{
			opacity: 0.1!important;
	  }

</style>

// AFTER (lines 18-35)
	  #query-builder .group-conditions .btn.disabled{
			opacity: 0.1!important;
	  }

	  .listings-table thead th:nth-child(1),
	  .listings-table tbody td:nth-child(1){position:sticky;left:0;background:#fff;z-index:2;}
	  .listings-table thead th:nth-child(2),
	  .listings-table tbody td:nth-child(2){position:sticky;left:200px;background:#fff;z-index:2;}
	  .listings-table thead th:nth-child(3),
	  .listings-table tbody td:nth-child(3){position:sticky;left:425px;background:#fff;z-index:2;}
	  .listings-table thead th:nth-child(1),
	  .listings-table thead th:nth-child(2),
	  .listings-table thead th:nth-child(3){background:#6c757d;z-index:3;}
	  .listings-table tbody tr:hover td:nth-child(1),
	  .listings-table tbody tr:hover td:nth-child(2),
	  .listings-table tbody tr:hover td:nth-child(3){background:#f5f5f5;}

</style>
```

**Change 2: Reduce title width (in Handlebars template)**

```html
// BEFORE
<div style="width:260px; white-space: normal;">{{title}}</div>

// AFTER
<div style="width:200px; white-space: normal;">{{title}}</div>
```

---

### Testing

1. Navigate to the listings page
2. Scroll horizontally - Title, Image, and Address columns should stay fixed
3. Verify reduced dead space between Title and Image columns
4. Hover over rows - sticky columns should highlight with same background

---

### Notes

- Left offsets calculated as: col1=0, col2=200px (title width), col3=425px (title+image)
- White background prevents content overlap when scrolling
- Header keeps gray background (#6c757d) to match existing theme
- Hover state preserves row highlight on sticky cells
- CSS-only fix, no PHP changes required

---

### Reviewer Notes

_To be filled by original developer during review_

- [ ] Code style matches existing patterns
- [ ] Fix is minimal and focused
- [ ] No unnecessary changes
- [ ] Tested and working
