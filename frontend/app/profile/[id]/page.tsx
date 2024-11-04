export default async function Profile({ params }: { params: { id: string, tk: string } }) {
    const { id, tk } = await params
    const response = fetch(`http://localhost:5000/api/users/${id}`, { headers: { 'Authorization': tk } });

    const user = (async () => {
        const user = await response.then(console.log)
        console.log(user)
        return user
    })()

    return (
        <div>
            <div>Perfil do Usuário ID: {id}</div>
            <div>Nome: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Role: {user.role}</div>
        </div>
    );
}
