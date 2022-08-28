import useApi from 'src/composables/UseApi'

export default function servicosService () {
  const { list, getById, post, update, remove } = useApi('servicos')

  return {
    list,
    getById,
    post,
    update,
    remove
  }
}
