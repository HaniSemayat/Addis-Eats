import {
    useCallback,
    useState
} from "react";

import DishItem from "./DishItem";
import Modal from "../ui/Modal";
import formatCurrency from "../utils/formatCurrency";

function DishList({ dishes, onAdd }) {
    const [selectedDish, setSelectedDish] =
        useState(null);

    const handleQuickView =
        useCallback(function (dish) {
            setSelectedDish(dish);
        }, []);

    const handleClose =
        useCallback(function () {
            setSelectedDish(null);
        }, []);

    function handleQuickViewAdd() {
        if (
            !selectedDish ||
            selectedDish.available === false
        ) {
            return;
        }

        onAdd(selectedDish);
        handleClose();
    }

    if (dishes.length === 0) {
        return (
            <p className="empty">
                No dishes in this category yet.
            </p>
        );
    }

    return (
        <>
            <section className="menu">
                {dishes.map(function (dish) {
                    const isAvailable =
                        dish.available !== false;

                    return (
                        <div
                            className={
                                isAvailable
                                    ? ""
                                    : "dish-unavailable"
                            }
                            key={dish.id}
                        >
                            <DishItem
                                dish={dish}
                                onAdd={onAdd}
                                onQuickView={
                                    handleQuickView
                                }
                            />

                            {!isAvailable && (
                                <p className="unavailable-message">
                                    Currently unavailable
                                </p>
                            )}
                        </div>
                    );
                })}
            </section>

            {selectedDish && (
                <Modal
                    title={selectedDish.name}
                    onClose={handleClose}
                >
                    <p>
                        Price:{" "}
                        {formatCurrency(
                            selectedDish.price
                        )}
                    </p>

                    {selectedDish.spicy && (
                        <p>• Spicy</p>
                    )}

                    {selectedDish.available === false ? (
                        <p className="unavailable-message">
                            This dish is currently
                            unavailable.
                        </p>
                    ) : (
                        <>
                            <p>
                                Enjoy this dish from
                                Addis Eats.
                            </p>

                            <button
                                type="button"
                                onClick={
                                    handleQuickViewAdd
                                }
                            >
                                Add to Cart
                            </button>
                        </>
                    )}
                </Modal>
            )}
        </>
    );
}

export default DishList;