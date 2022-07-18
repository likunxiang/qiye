<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<el-tooltip content={title} placement="right" open-delay={500} effect="dark" popper-class="atooltip" slot='title'><span >{(title)}</span></el-tooltip>)

    }
    return vnodes
  }
}
</script>
