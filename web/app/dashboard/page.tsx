export default function DashboardPage() {
    return (
        <>
            {Array.from({ length: 100 }).map((_, i) => (
                <div key={i}>{i}</div>
            ))}
        </>
    )
}