export function lucidePick({ iconListCallback, categoryCallback, initialCategory, initialFilter, }: LucidePickOptions): LucidePickResult;
export type LucideIconMetadata = {
    /**
     * - The name of the icon in Pascal Case.
     */
    icon: string;
    /**
     * - The name of the icon in kebab case.
     */
    name: string;
    /**
     * - An array of tags associated with the icon.
     */
    tags: string[];
    /**
     * - An array of categories the icon belongs to.
     */
    categories: string[];
};
/**
 * A tuple where the first element is a string key, and the second is a set of LucideIconMetadata.
 */
export type LucideIconEntryTuple = [string, Set<LucideIconMetadata>];
export type CategoryCount = {
    /**
     * - The name of the icon category.
     */
    category: string;
    /**
     * - The number of icons in this category.
     */
    count: number;
};
export type IconCallback = (icons: LucideIconMetadata[]) => void;
export type CategoryCallback = (categories: CategoryCount[]) => void;
export type LucidePickOptions = {
    /**
     * - Callback invoked with icons for category selection.
     */
    categoryCallback: CategoryCallback;
    /**
     * - Callback invoked with icons for the icon list display.
     */
    iconListCallback: IconCallback;
    /**
     * - Optional initial category to filter the icons.
     */
    initialCategory?: string;
    /**
     * - Optional initial filter string to apply to icon names or tags.
     */
    initialFilter?: string;
};
export type LucidePickResult = {
    /**
     * - Returns the icon metadata for the given icon name.
     */
    getIcon: (icon: string) => LucideIconMetadata;
    /**
     * - Sets a filter to show only icons matching the given tag filter.
     */
    setFilter: (tagFilter: string) => void;
    /**
     * - Clears any active filters.
     */
    clearFilter: () => void;
    /**
     * - Sets the active category to filter icons by.
     */
    setCategory: (category: string) => void;
};
//# sourceMappingURL=lucide-pick.d.ts.map