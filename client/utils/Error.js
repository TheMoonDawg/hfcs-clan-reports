export default function Error(result) {
    this.status = result.status
    this.statusText = result.statusText
    this.name = 'Error'
}