import type { EventHandler, IEventBus } from './types'

export class EventBus implements IEventBus {
  private _listeners: Record<string, EventHandler[]> = {}

  on: IEventBus['on'] = (event, callback) => {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }

    this._listeners[event].push(callback)
  }

  off: IEventBus['off'] = (event, callback) => {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this._listeners[event] = this._listeners[event].filter(
      listener => listener !== callback
    )
  }

  emit: IEventBus['emit'] = (event, ...args) => {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this._listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
