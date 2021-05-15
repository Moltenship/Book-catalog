import { ElButton, ElHeader, ElCollapse, ElCollapseItem, ElSelect, ElOption } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElHeader)
  app.use(ElCollapse)
  app.use(ElCollapseItem)
  app.use(ElSelect)
  app.use(ElOption)
}
