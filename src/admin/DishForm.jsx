import { useState } from "react";

const emptyDish = {
    name: "",
    amharicName: "",
    description: "",
    ingredients: "",
    price: "",
    category: "Ethiopian",
    fasting: false,
    spicy: false,
    prepTime: "",
    isSpecial: false,
    image: "",
    available: true
};

function createFormFromDish(dish) {
    if (!dish) {
        return emptyDish;
    }

    return {
        name: dish.name ?? "",
        amharicName:
            dish.amharicName ?? "",
        description:
            dish.description ?? "",
        ingredients:
            dish.ingredients
                ? dish.ingredients.join(", ")
                : "",
        price: dish.price ?? "",
        category:
            dish.category ??
            "Ethiopian",
        fasting:
            dish.fasting ?? false,
        spicy:
            dish.spicy ?? false,
        prepTime:
            dish.prepTime ?? "",
        isSpecial:
            dish.isSpecial ?? false,
        image:
            dish.image ?? "",
        available:
            dish.available ?? true
    };
}

function DishForm({
    dish,
    onSave,
    onCancel
}) {
    const [form, setForm] =
        useState(function () {
            return createFormFromDish(dish);
        });

    function handleChange(event) {
        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setForm(function (current) {
            return {
                ...current,
                [name]:
                    type === "checkbox"
                        ? checked
                        : value
            };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const preparedDish = {
            ...form,
            price: Number(form.price),
            ingredients:
                form.ingredients
                    .split(",")
                    .map(function (item) {
                        return item.trim();
                    })
                    .filter(function (item) {
                        return item !== "";
                    })
        };

        onSave(preparedDish);
    }

    return (
        <form
            className="admin-dish-form"
            onSubmit={handleSubmit}
        >
            <div className="admin-form-grid">

                <label>
                    Dish Name
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Amharic Name
                    <input
                        name="amharicName"
                        type="text"
                        value={form.amharicName}
                        onChange={handleChange}
                    />
                </label>

                <label className="admin-form-wide">
                    Description
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="admin-form-wide">
                    Ingredients
                    <input
                        name="ingredients"
                        type="text"
                        value={form.ingredients}
                        onChange={handleChange}
                        placeholder="Chicken, Butter, Onion, ..."
                        required
                    />
                    <small>
                        Separate ingredients with commas.
                    </small>
                </label>

                <label>
                    Price (ETB)
                    <input
                        name="price"
                        type="number"
                        min="0"
                        step="1"
                        value={form.price}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Category
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="Ethiopian">
                            Ethiopian
                        </option>
                        <option value="Pizza">
                            Pizza
                        </option>
                        <option value="Burgers">
                            Burgers
                        </option>
                        <option value="International">
                            International
                        </option>
                        <option value="Breakfast">
                            Breakfast
                        </option>
                        <option value="Drinks">
                            Drinks
                        </option>
                    </select>
                </label>

                <label>
                    Preparation Time
                    <input
                        name="prepTime"
                        type="text"
                        value={form.prepTime}
                        onChange={handleChange}
                        placeholder="20-30 min"
                        required
                    />
                </label>

                <label className="admin-form-wide">
                    Image URL
                    <input
                        name="image"
                        type="url"
                        value={form.image}
                        onChange={handleChange}
                        required
                    />
                </label>

            </div>

            <div className="admin-checkboxes">

                <label>
                    <input
                        name="available"
                        type="checkbox"
                        checked={form.available}
                        onChange={handleChange}
                    />
                    Available
                </label>

                <label>
                    <input
                        name="fasting"
                        type="checkbox"
                        checked={form.fasting}
                        onChange={handleChange}
                    />
                    Fasting
                </label>

                <label>
                    <input
                        name="spicy"
                        type="checkbox"
                        checked={form.spicy}
                        onChange={handleChange}
                    />
                    Spicy
                </label>

                <label>
                    <input
                        name="isSpecial"
                        type="checkbox"
                        checked={form.isSpecial}
                        onChange={handleChange}
                    />
                    Special
                </label>

            </div>

            <div className="admin-form-actions">

                <button type="submit">
                    {dish
                        ? "Save Changes"
                        : "Add Dish"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

            </div>
        </form>
    );
}

export default DishForm;
