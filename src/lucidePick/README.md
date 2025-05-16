# LucidePick

A utility for working with Lucide icons metadata.

## Overview

LucidePick provides a way to filter and select Lucide icons by category, name, or tags. This utility helps applications that need to present icon selection interfaces to users.

## Implementation Details

### Metadata Loading Strategy

The metadata for Lucide icons is loaded using a category-based approach to improve performance and reduce memory usage:

1. **Split by Category**: The large `lucide-metadata.json` file is split into smaller category-based JavaScript files using the `split-metadata.js` script.

2. **Category-Based Organization**: Each icon is assigned to one or more categories, with a primary category (the first in the list) determining which category file it's stored in.

3. **Combined Loading**: The `lucide-pick.js` module imports the `lucide-metadata-combined.js` file, which combines all category files into a single array.

4. **Efficient Data Structures**: The implementation uses JavaScript Maps and Sets for efficient data storage, retrieval, and filtering operations.

### Files

- **lucide-pick.js**: The main module that provides the API for filtering and selecting icons.
- **lucide-metadata.json**: The original metadata file containing all icon information.
- **lucide-metadata-combined.js**: A generated file that imports and combines all category files.
- **categories/**: Directory containing individual category files (e.g., `arrows.js`, `design.js`).
- **split-metadata.js**: Utility script to split the metadata into category files.
- **test.js**: Test script to verify the functionality.

## Icon Metadata Structure

Each icon in the metadata has the following structure:

```javascript
{
    icon: 'IconName',        // Pascal case name (e.g., 'ArrowRight')
    name: 'icon-name',       // Kebab case name (e.g., 'arrow-right')
    tags: [                  // Array of related terms for searching
        'direction',
        'navigation',
        'right'
    ],
    categories: [            // Array of categories the icon belongs to
        'arrows',            // Primary category (first in the list)
        'navigation'
    ]
}
```

## Usage

```javascript
import { lucidePick } from './lucide-pick.js';

// Create a picker instance
const picker = lucidePick({
  // Callback for category list updates
  categoryCallback: (categories) => {
    // Handle category list updates
    // categories is an array of { category, count } objects
    console.log(categories);
    // Example: [{ category: '*', count: 1024 }, { category: 'arrows', count: 24 }, { category: 'design', count: 18 }]
    // Note: '*' category is always first, other categories are sorted alphabetically
    // The count for the '*' category represents the total number of icons matching the current filter
  },
  
  // Callback for icon list updates
  iconListCallback: (icons) => {
    // Handle icon list updates
    // icons is an array of icon metadata objects sorted alphabetically by name
    console.log(icons);
    // Example: [{ icon: 'ArrowUp', name: 'arrow-up', tags: [...], categories: [...] }]
  },
  
  // Optional initial category
  initialCategory: 'arrows',
  
  // Optional initial filter
  initialFilter: 'direction'
});

// Methods available on the picker instance
picker.setCategory('design');     // Filter by category
picker.setCategory('*');          // Show all categories (wildcard - shows all icons)
picker.setFilter('chart');        // Filter by tag or name (case-insensitive)
picker.clearFilter();             // Clear all filters
picker.getIcon('ArrowUp');        // Get metadata for a specific icon
picker.getActiveCategory();       // Get the currently active category
picker.getActiveFilter();         // Get the currently active filter string
```

### Method Details

#### `setCategory(category)`

Sets the active category to filter icons by.

- `category`: The icon category to select. Use `'*'` to select all categories.
- Throws an error if the category is empty or not found.
- The special `'*'` category represents all icons and is always listed first in the category list.

#### `setFilter(tagFilter)`

Filters icons by tags or names that include the given filter string.

- `tagFilter`: The tag filter string to apply.
- Filtering is case-insensitive.
- Can be combined with category filtering.

#### `clearFilter()`

Clears any active filters and resets to show all icons.

#### `getIcon(icon)`

Returns the icon metadata for the given icon name.

- `icon`: The icon name in Pascal case (e.g., 'ArrowRight').
- Returns `undefined` if the icon doesn't exist.

#### `getActiveCategory()`

Returns the currently active category.

- Returns the string name of the active category, or `'*'` if all categories are selected.

#### `getActiveFilter()`

Returns the currently active filter string.

- Returns the current filter string, or an empty string if no filter is applied.

## Generating Category Files

To regenerate the category files from the latest `lucide-metadata.json`:

```bash
node src/lucidePick/split-metadata.js
```

This will:
1. Read the `lucide-metadata.json` file
2. Extract all unique primary categories
3. Create a separate file for each category in the `categories/` directory
4. Generate the `lucide-metadata-combined.js` file that imports all categories

## Sorting Behavior

LucidePick ensures consistent sorting of both categories and icons:

- **Category Sorting**: 
  - The special `'*'` category (representing all icons) is always placed first in the category list.
  - All other categories are sorted alphabetically.
  - The count for the `'*'` category represents the total number of icons matching the current filter.

- **Icon Sorting**:
  - Icons are always returned sorted alphabetically by name (the Pascal case `icon` property).
  - This sorting is applied consistently in all scenarios: when viewing all icons, when filtering by category, and when filtering by search term.

## Benefits

- **Reduced Memory Usage**: By splitting the metadata into smaller files, the JavaScript engine can better optimize memory usage.
- **Improved Performance**: Loading smaller chunks of data is faster than loading one large file.
- **Better AI Compatibility**: The smaller files are more compatible with AI tools that might struggle with large JSON files.
- **Efficient Filtering**: The use of Maps and Sets provides efficient filtering and lookup operations.
- **Consistent Ordering**: The predictable sorting of categories and icons improves user experience and makes UI implementation simpler.
