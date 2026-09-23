function Skeleton() {
    return (
        <section className="menu skeleton-menu">
            {Array.from({ length: 8 }).map(
                function (_, index) {
                    return (
                        <div
                            className="skeleton-card"
                            key={index}
                        >
                            <div className="skeleton-image" />

                            <div className="skeleton-line skeleton-title" />

                            <div className="skeleton-line skeleton-text" />

                            <div className="skeleton-line skeleton-price" />

                            <div className="skeleton-button" />
                        </div>
                    );
                }
            )}
        </section>
    );
}

export default Skeleton;