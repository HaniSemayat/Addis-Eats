import {
    useEffect,
    useId,
    useRef
} from "react";

import { createPortal } from "react-dom";

function Modal({
    title,
    children,
    onClose
}) {
    const dialogRef = useRef(null);
    const previousFocusRef = useRef(null);

    const titleId = useId();

    useEffect(() => {
        previousFocusRef.current =
            document.activeElement;

        const dialog =
            dialogRef.current;

        if (!dialog) {
            return undefined;
        }

        const focusableElements =
            dialog.querySelectorAll(
                'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        } else {
            dialog.focus();
        }

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const elements =
                dialog.querySelectorAll(
                    'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
                );

            if (elements.length === 0) {
                event.preventDefault();
                return;
            }

            const first = elements[0];
            const last =
                elements[elements.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {
                event.preventDefault();
                last.focus();
                return;
            }

            if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        }

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            if (
                previousFocusRef.current &&
                typeof previousFocusRef.current
                    .focus === "function"
            ) {
                previousFocusRef.current.focus();
            }
        };
    }, [onClose]);

    function handleBackdropMouseDown(event) {
        if (
            event.target ===
            event.currentTarget
        ) {
            onClose();
        }
    }

    return createPortal(
        <div
            className="modal-backdrop"
            onMouseDown={
                handleBackdropMouseDown
            }
        >
            <div
                ref={dialogRef}
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex="-1"
            >
                <div className="modal-header">
                    <h2 id={titleId}>
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        ×
                    </button>
                </div>

                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;