<template>
  <q-page padding>
    <q-table
      title="Serviços"
      :rows="servicos"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top>
      <span>Artigos</span>
      <q-space />
      <q-btn color="primary" label="Novo" :to="{ name: 'formPost' }" />
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)"></q-btn>
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import servicoService from 'src/services/servicos'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const servicos = ref([])
    const { list, remove } = servicoService()
    const columns = [
      { name: 'id', field: 'id', align: 'left', label: 'Id', sortable: true },
      { name: 'nomeServico', field: 'nomeServico', align: 'left', label: 'Nome', sortable: true },
      // { name: 'terceiro', field: 'terceiro', align: 'left', label: 'Terceiro', sortable: true },
      { name: 'actions', field: 'actions', align: 'right', label: 'Ações' }
    ]
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getServicos()
    })

    const getServicos = async () => {
      try {
        const data = await list()
        servicos.value = data.lista
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Remover',
          message: 'Deseja remover?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Apagado com sucesso!', icon: 'check', color: 'positive' })
          await getServicos()
        })
      } catch (error) {
        alert(error)
      }
    }

    const handleEditPost = (id) => {
      router.push({ name: 'formPost', params: { id } })
    }
    return {
      servicos,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>
