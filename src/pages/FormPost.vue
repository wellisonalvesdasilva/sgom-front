<template>
    <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="row q-col-gutter-sm"
    >
    <q-input
        outline
        v-model="form.nomeServico"
        label="Nome"
        lazy-rules
        class="col-md-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
    />

    <div class="col-12 q-gutter-sm">
    <q-btn
      label="Salvar"
      color="primary"
      class="float-right"
      icon="save"
      type="submit">
    </q-btn>
    <q-btn
      label="Cancelar"
      color="white"
      class="float-right"
      text-color="primary"
      :to="{ name: 'home' }"></q-btn>
    </div>
    </q-form>
    </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import servicoService from 'src/services/servicos'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'FormPost',
  setup () {
    const { post, getById, update } = servicoService()
    const form = ref({
      nomeServico: ''
    })
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value)
        } else {
          await post(form.value)
        }
        $q.notify({ message: 'Registro salvo com sucesso!', icon: 'check', color: 'positive' })
        router.push({ name: 'home' })
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(async () => {
      if (route.params.id) {
        getPost(route.params.id)
      }
    })

    const getPost = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.error(error)
      }
    }

    return {
      form,
      onSubmit
    }
  }
})
</script>
