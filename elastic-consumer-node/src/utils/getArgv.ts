

const getArgvCommand = () => {
    const content = process.argv[2]
    return content.length > 0 ? content.split('-')[0].toLowerCase() : ''
}

export {
    getArgvCommand
}