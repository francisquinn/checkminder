export function Button({ onClick, text, type, className }) {
    return (
        <button type={type} className={className} onClick={onClick}>
            { text }
        </button>
    );
}