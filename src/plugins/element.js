import { ElButton, ElHeader, ElCollapse, ElCollapseItem, ElSelect, ElOption, ElDialog } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElHeader)
  app.use(ElCollapse)
  app.use(ElCollapseItem)
  app.use(ElSelect)
  app.use(ElOption)
  app.use(ElDialog)
}
