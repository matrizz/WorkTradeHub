export default function JobDetails({ params }: { params: { id: string } }) {
    return <div>Detalhes do Trabalho ID: {params.id}</div>;
}
