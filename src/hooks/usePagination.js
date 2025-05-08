import { ref, reactive } from 'vue'

export default function usePagination(options = {}) {
  // 分页参数
  const pagination = reactive({
    // 搜索条件
    condition: '',
    // 当前页码
    pageNum: 1,
    // 每页数量，可通过选项配置
    pageSize: options.pageSize || 15,
    // 总条数
    total: 0
  })

  // 列表数据
  const list = ref([])

  // 加载状态
  const loading = ref(false)

  // 是否还有更多数据
  const hasMore = ref(true)

  // 重置分页数据
  const reset = () => {
    pagination.pageNum = 1
    pagination.total = 0
    list.value = []
    hasMore.value = true
  }

  // 加载数据
  const loadData = async (params = {}) => {
    // 防止重复加载
    if (loading.value) return

    // 如果没有更多数据，直接返回
    if (!hasMore.value) return

    try {
      loading.value = true

      // 构建请求参数
      const requestParams = {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        condition: pagination.condition,
        ...params
      }

      // 调用传入的请求方法
      const res = await options.request?.(requestParams)

      // 更新数据
      if (res) {
        // 第一页时重置列表
        if (pagination.pageNum === 1) {
          list.value = []
        }

        // 追加数据
        list.value.push(...res.list)

        // 更新总数
        pagination.total = res.total

        // 判断是否还有更多数据
        hasMore.value = list.value.length < pagination.total

        // 页码自增
        pagination.pageNum++
      }
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 刷新数据
  const refresh = async (params = {}) => {
    reset()
    await loadData(params)
  }

  return {
    // 状态
    list,
    loading,
    hasMore,
    pagination,

    // 方法
    loadData,
    refresh,
    reset
  }
}
