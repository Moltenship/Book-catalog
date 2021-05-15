import { ElButton, ElHeader, ElCollapse, ElCollapseItem } from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElHeader)
  app.use(ElCollapse)
  app.use(ElCollapseItem)
}
