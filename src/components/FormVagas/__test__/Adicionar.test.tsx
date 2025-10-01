import { screen, fireEvent } from '@testing-library/react'
import FormVagas from '..'
import { renderizaComProvider } from '../../../Utils/tests'

describe('FormVagas', () => {
  test('deve permitir adicionar comentários', () => {
    const mockAoPesquisar = jest.fn()

    renderizaComProvider(<FormVagas aoPesquisar={mockAoPesquisar} />)

    const input = screen.getByTestId('campo-comentario')
    const button = screen.getByTestId('btn-cadastrar')

    // Adicionar primeiro comentário
    fireEvent.change(input, { target: { value: 'Primeira vaga interessante' } })
    fireEvent.click(button)

    // Adicionar segundo comentário
    fireEvent.change(input, { target: { value: 'Segunda vaga também é boa' } })
    fireEvent.click(button)

    // Verificar se os comentários aparecem na lista
    expect(screen.getByText('Primeira vaga interessante')).toBeInTheDocument()
    expect(screen.getByText('Segunda vaga também é boa')).toBeInTheDocument()
  })

  test('deve chamar função aoPesquisar quando formulário é enviado', () => {
    const mockAoPesquisar = jest.fn()

    renderizaComProvider(<FormVagas aoPesquisar={mockAoPesquisar} />)

    const input = screen.getByTestId('campo-comentario')
    const button = screen.getByTestId('btn-cadastrar')

    fireEvent.change(input, { target: { value: 'termo de busca' } })
    fireEvent.click(button)

    expect(mockAoPesquisar).toHaveBeenCalledWith('termo de busca')
  })
})
