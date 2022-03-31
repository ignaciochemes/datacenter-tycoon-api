export function importAllFromRequireContext(
    requireContext: __WebpackModuleApi.RequireContext,
) {
    const importedModules: any = requireContext.keys().map((filename) => {
        const required = requireContext(filename);

        return Object.keys(required).reduce((result, exportedKey) => {
            return result.concat(required[exportedKey]);
        }, [] as any);
    });

    return importedModules.flat();
}
