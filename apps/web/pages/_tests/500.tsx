const Page = () => {
    return <>Throw a 500 on purpose</>
}

export const getServerSideProps = async () => {
    throw new Error('Force a 500 error')
}

export default Page
