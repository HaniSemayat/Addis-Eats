function getPrepTimeRange(prepTime) {
    if (!prepTime) {
        return {
            min: 0,
            max: 0
        };
    }

    const numbers =
        prepTime.match(/\d+/g);

    if (!numbers || numbers.length === 0) {
        return {
            min: 0,
            max: 0
        };
    }

    if (numbers.length === 1) {
        const value =
            Number(numbers[0]);

        return {
            min: value,
            max: value
        };
    }

    return {
        min: Number(numbers[0]),
        max: Number(numbers[1])
    };
}

function estimateDeliveryTime(items) {
    if (!items || items.length === 0) {
        return "";
    }

    let preparationMin = 0;
    let preparationMax = 0;

    items.forEach(function (item) {
        const range =
            getPrepTimeRange(
                item.prepTime
            );

        preparationMin = Math.max(
            preparationMin,
            range.min
        );

        preparationMax = Math.max(
            preparationMax,
            range.max
        );
    });

    const deliveryMin = 15;
    const deliveryMax = 30;

    return `${preparationMin + deliveryMin}-${preparationMax + deliveryMax} min`;
}

export default estimateDeliveryTime;