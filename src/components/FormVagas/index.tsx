import { FormEvent, useState } from 'react'

import { FormStyled } from './styles'

type Props = {
  aoPesquisar: (termo: string) => void
}

const FormVagas = ({ aoPesquisar }: Props) => {
  const [comentarioTemp, setComentarioTemp] = useState('')
  const [comentarios, setComentarios] = useState<string[]>([])

  const aoEnviarForm = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    // Buscar vagas
    aoPesquisar(comentarioTemp)

    // Adicionar comentário se não estiver vazio
    if (comentarioTemp.trim()) {
      cadastrarComentario()
    }
  }

  function cadastrarComentario() {
    setComentarios([...comentarios, comentarioTemp])
    setComentarioTemp('')
  }

  return (
    <FormStyled>
      <form onSubmit={aoEnviarForm}>
        <input
          data-testid="campo-comentario"
          value={comentarioTemp}
          placeholder="Digite um comentario sobre as vagas"
          onChange={(evento) => setComentarioTemp(evento.target.value)}
          type="search"
        />
        <button data-testid="btn-cadastrar" type="submit">
          Enviar
        </button>
        <ul>
          {comentarios.map((comentario, index) => (
            <li key={index}>{comentario}</li>
          ))}
        </ul>
      </form>
    </FormStyled>
  )
}

export default FormVagas
