export default class Component {
    constructor(templateId, rootId) {
        this.template = document.getElementById(templateId).content
        this.root = document.getElementById(rootId)
        this.fragment = document.createDocumentFragment()
    }
    render() { }
    event() { }
}