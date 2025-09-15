import React, { useState } from 'react'
import { Tabs, Input, Button, Checkbox, Space, List } from 'antd'

export default function TodoApp() {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // thêm task
  const addTask = () => {
    if (!input.trim()) return
    const newTask = { id: Date.now(), text: input.trim(), completed: false }
    setTasks([...tasks, newTask])
    setInput('')
  }

  // toggle check
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // xóa task đã completed (chỉ dùng trong tab Completed)
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const deleteAllCompleted = () => {
    setTasks(tasks.filter(t => !t.completed))
  }

  // lọc theo tab
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'active') return !task.completed
    if (activeTab === 'completed') return task.completed
    return true
  })

  const items = [
    {
      key: 'all',
      label: 'All',
      children: (
        <>
          <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
            <Input
              placeholder="add details"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <Button type="primary" onClick={addTask}>Add</Button>
          </Space.Compact>
          <List
            dataSource={filteredTasks}
            renderItem={task => (
              <List.Item>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.text}
                </Checkbox>
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: 'active',
      label: 'Active',
      children: (
        <>
          <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
            <Input
              placeholder="add details"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <Button type="primary" onClick={addTask}>Add</Button>
          </Space.Compact>
          <List
            dataSource={filteredTasks}
            renderItem={task => (
              <List.Item>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                >
                  {task.text}
                </Checkbox>
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      key: 'completed',
      label: 'Completed',
      children: (
        <>
          <List
            dataSource={filteredTasks}
            renderItem={task => (
              <List.Item
                actions={[
                  <Button danger type="text" onClick={() => deleteTask(task.id)}>x</Button>
                ]}
              >
                <Checkbox checked disabled>{task.text}</Checkbox>
              </List.Item>
            )}
          />
          {filteredTasks.length > 0 && (
            <Button
              danger
              style={{ marginTop: 16 }}
              onClick={deleteAllCompleted}
            >
              🗑 delete all
            </Button>
          )}
        </>
      ),
    },
  ]

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      centered
      items={items}
    />
  )
}
