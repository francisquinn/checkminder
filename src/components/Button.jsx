export function Button({ onClick, text, type }) {
    return (
        <button type={type} onClick={onClick}>
            { text }
        </button>
    );
}