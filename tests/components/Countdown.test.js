import { render, act } from '@testing-library/react'
import Countdown from '../../src/components/Countdown'

describe('<Countdown />', () => {
  afterAll(() => {
    jest.clearAllTimers()
  })

  test('should unmount and clear interval to prevent memory leaks', () => {
    jest.useFakeTimers()
    const { unmount } = render(<Countdown nextClass="March 21, 5050" />)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    act(() => jest.runOnlyPendingTimers())
    unmount()
    expect(console.error).not.toHaveBeenCalled()
    expect(clearInterval.clock.timers['3'].id).toEqual(3)
  })

  test('should render countdown when class is a future date', () => {
    const { getByText } = render(<Countdown nextClass="March 21, 5050" />)
    expect(getByText(/Days/)).toBeInTheDocument()
    expect(getByText(/Hours/)).toBeInTheDocument()
    expect(getByText(/Minutes/)).toBeInTheDocument()
    expect(getByText(/Seconds/)).toBeInTheDocument()
  })

  test('should render class in session message when past class date', () => {
    const { getByText } = render(<Countdown nextClass="March 21, 1999" />)
    expect(getByText(/Class Is In Session/)).toBeInTheDocument()
  })
})
