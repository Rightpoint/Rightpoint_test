export const getServerSideProps = async () => {
    return {
        redirect: {
            destination: '/industries/mobility',
        },
    }
}

const Page = () => {
    return <></>
}

export default Page
