function CategoryBar({
    selected,
    onSelect
}) {
    const categories = [
        "All",
        "Habeshan",
        "International",
        "Pizza & Pasta",
        "Burgers",
        "Breakfast",
        "Drinks"
    ];

    return (
        <div className="category-bar">
            {categories.map(
                function (category) {
                    return (
                        <button
                            key={category}
                            type="button"
                            className={
                                selected ===
                                category
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={
                                function () {
                                    onSelect(
                                        category
                                    );
                                }
                            }
                        >
                            {category}
                        </button>
                    );
                }
            )}
        </div>
    );
}

export default CategoryBar;