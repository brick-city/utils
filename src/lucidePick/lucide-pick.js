/**
 * @typedef {Object} LucideIconMetadata
 * @property {string} icon - The name of the icon in Pascal Case.
 * @property {string} name - The name of the icon in kebab case.
 * @property {string[]} tags - An array of tags associated with the icon.
 * @property {string[]} categories - An array of categories the icon belongs to.
 */

/**
 * @typedef {[string, Set<LucideIconMetadata>]} LucideIconEntryTuple
 * A tuple where the first element is a string key, and the second is a set of LucideIconMetadata.
 */

/**
 * @type {Promise<LucideIconMetadata[]>}
 * @description Promise that resolves to metadata for Lucide icons.
 */
/**
 * @type {LucideIconMetadata[]}
 * @description Metadata for Lucide icons.
 */
import metadata from './lucide-metadata-combined.js';

/**
 * @type {Map<string, LucideIconMetadata>}
 */
const lucideIcons = new Map(metadata.map((obj) => [obj.icon, obj]));

/**
 * @type {Map<string, Set<LucideIconMetadata>>}
 * @description Map of categories to sets of icons in each category
 */
const lucideCategories = new Map();

// Initialize categories map more efficiently
metadata.forEach((icon) => {

    icon.categories.forEach((cat) => {

        if (!lucideCategories.has(cat)) {

            lucideCategories.set(cat, new Set());

        }
        lucideCategories.get(cat).add(icon);

    });

});

/**
 * @type {Map<string, Set<LucideIconMetadata>>}
 * @description Map of tags and names to sets of icons with those tags/names
 */
const lucideTagIcons = new Map();

// Initialize tag/name map more efficiently
metadata.forEach((icon) => {

    // Add tags
    icon.tags.forEach((tag) => {

        const lowercaseTag = tag.toLowerCase();
        if (!lucideTagIcons.has(lowercaseTag)) {

            lucideTagIcons.set(lowercaseTag, new Set());

        }
        lucideTagIcons.get(lowercaseTag).add(icon);

    });

    // Add name
    const lowercaseName = icon.name.toLowerCase();
    if (!lucideTagIcons.has(lowercaseName)) {

        lucideTagIcons.set(lowercaseName, new Set());

    }
    lucideTagIcons.get(lowercaseName).add(icon);

});

const lucideTags = [...lucideTagIcons.keys()];

/**
 * @typedef {Object} CategoryCount
 * @property {string} category - The name of the icon category.
 * @property {number} count - The number of icons in this category.
 *
 * @callback IconCallback
 * @param {LucideIconMetadata[]} icons - The array of LucideIcon items.
 * @returns {void}
 *
 * @callback CategoryCallback
 * @param {CategoryCount[]} categories - The array of category count items.
 * @returns {void}

 * @typedef {Object} LucidePickOptions
 * @property {CategoryCallback} categoryCallback - Callback invoked with icons for category selection.
 * @property {IconCallback} iconListCallback - Callback invoked with icons for the icon list display.
 * @property {string} [initialCategory] - Optional initial category to filter the icons.
 * @property {string} [initialFilter] - Optional initial filter string to apply to icon names or tags.

 * @typedef {Object} LucidePickResult
 * @property {(icon: string) => LucideIconMetadata} getIcon - Returns the icon metadata for the given icon name.
 * @property {(tagFilter: string) => void} setFilter - Sets a filter to show only icons matching the given tag filter.
 * @property {() => void} clearFilter - Clears any active filters.
 * @property {(category: string) => void} setCategory - Sets the active category to filter icons by.
 *
 * @function
 * @name lucidePick
 * @param {LucidePickOptions} options - Configuration options for lucidePick.
 * @returns {LucidePickResult} An object with methods to interact with the icon picker.
 */

export const lucidePick = ({
    iconListCallback, categoryCallback, initialCategory = '*', initialFilter,
}) => {

    let currentFilter = ''; // Currently active filter
    let currentCategory = ''; // Currently selected category
    let filteredIcons = new Set(); // Currently filtered icons
    const lucideCategoriesFiltered = new Map(); // Map to store filtered icons by category

    /**
     * @description Clears any active filters and resets to show all icons
     */
    const clearFilter = () => { // Reset current filter state

        currentFilter = '';

        filteredIcons = new Set(lucideIcons.values());

        // Reset filtered categories to original categories
        lucideCategoriesFiltered.clear();
        lucideCategories.forEach((iconSet, cat) => {

            lucideCategoriesFiltered.set(cat, new Set(iconSet));

        });

    };

    /**
     * @param {string} tagFilter - The tag filter string to apply
     * @description Filters icons by tags that include the given filter string
     */
    const setFilter = (tagFilter) => {

        // Update current filter state
        currentFilter = tagFilter?.toLowerCase()?.trim() || '';

        if (currentFilter === '') {

            // If filter is empty, reset to show all icons
            clearFilter();

        } else {

            // Find tags that match the filter
            const filteredTags = lucideTags.filter((tag) => tag.includes(currentFilter));

            // Clear previous filtered icons
            filteredIcons.clear();

            // Add all icons from matching tags to the filtered set
            filteredTags.forEach((tag) => {

                const icons = lucideTagIcons.get(tag);
                if (icons) {

                    icons.forEach((icon) => filteredIcons.add(icon));

                }

            });

            // Update filtered categories based on the new filter
            [...lucideCategoriesFiltered.keys()].forEach((cat) => {

                // Get all icons in this category
                const categoryIcons = lucideCategories.get(cat);

                // Create intersection of filtered icons and category icons
                const intersection = new Set();
                filteredIcons.forEach((icon) => {

                    if (categoryIcons.has(icon)) {

                        intersection.add(icon);

                    }

                });

                lucideCategoriesFiltered.set(cat, intersection);

            });

        }

    };

    /**
     * @param {string} category - The icon category to select, passing '*' will select all categories
     * @description Sets the active category to filter icons by
     * @throws {Error} If the category is empty or not found
     */
    const setCategory = (category) => {

        // Validate category parameter
        if (!category || category.trim() === '') {

            throw new Error('Category cannot be empty');

        }

        // Special case for '*' (all categories)
        if (category !== '*' && !lucideCategories.has(category)) {

            throw new Error(`Category "${category}" not found`);

        }

        currentCategory = category;

    };

    /**
     * @description Helper function to sort icons by name
     * @param {LucideIconMetadata[]} icons - Array of icons to sort
     * @returns {LucideIconMetadata[]} Sorted array of icons
     */
    const sortIconsByName = (icons) => icons.sort((a, b) => a.icon.localeCompare(b.icon));

    /**
     * @description Calls the iconListCallback with the appropriate icons based on current filters
     */
    const callbackIconList = () => {

        let iconsToDisplay;

        if (currentCategory === '*') {

            iconsToDisplay = sortIconsByName([...filteredIcons.values()]);

        } else {

            // Filter by both category and tag/name
            iconsToDisplay = sortIconsByName([...lucideCategoriesFiltered.get(currentCategory)]);

        }

        iconListCallback(structuredClone(iconsToDisplay));

    };

    /**
     * @description Calls the categoryCallback with the current category counts
     * Creates an array of category objects with name and count properties
     */
    const callbackCategoryList = () => {

        // Convert the filtered categories map to an array of category count objects
        const filteredCategories = [...Array.from(lucideCategoriesFiltered, ([iconCategory, iconSet]) => ({
            category: iconCategory,
            count: iconSet.size,
        })), {
            category: '*',
            count: filteredIcons.size,
        }].sort((a, b) => {

            if (a.category === '*') return -1; // Always put '*' at the top
            return a.category.localeCompare(b.category);

        });

        // Invoke the callback with the category counts
        categoryCallback(filteredCategories);

    };

    const pick = {
        /**
         * @param {string} icon
         * @returns {LucideIconMetadata}
         * @description Returns the icon metadata for the given icon name.
         */
        getIcon: (icon) => lucideIcons.get(icon),

        getActiveCategory: () => currentCategory,

        getActiveFilter: () => currentFilter,

        /**
         * @param {string} tagFilter - The tag filter string to apply
         * @description Filters icons by tags that include the given filter string
         */
        setFilter: (tagFilter) => {

            setFilter(tagFilter);

            callbackCategoryList();
            callbackIconList();

        },

        /**
         * @description Clears any active filters and resets to show all icons
         */
        clearFilter: () => {

            clearFilter();

            callbackCategoryList();
            callbackIconList();

        },

        /**
         * @param {string} category - The icon category to select, passing '*' will select all categories
         * @description Sets the active category to filter icons by
         * @throws {Error} If the category is empty or not found
         */
        setCategory: (category) => {

            setCategory(category);

            callbackIconList();

        },

    };

    setFilter(initialFilter);
    setCategory(initialCategory);

    callbackCategoryList();
    callbackIconList();

    return pick;

};
