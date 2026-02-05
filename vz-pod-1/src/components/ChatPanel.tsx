import React, { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'

type Msg = { id: string; role: 'user' | 'assistant' | 'system'; text: string }

export default function ChatPanel() {
    const [messages, setMessages] = useState<Msg[]>([
        { id: 'm1', role: 'system', text: 'Welcome to Contract AI Agent. ' },
    ])
    const [docs, setDocs] = useState<string[]>([])
    const [links, setLinks] = useState<string[]>([])
    const [input, setInput] = useState('')
    const [linkInput, setLinkInput] = useState('')
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    function sendMessage() {
        if (!input.trim()) return
        const userMsg: Msg = { id: String(Date.now()), role: 'user', text: input }
        setMessages((m) => [...m, userMsg])
        setInput('')
        // naive assistant echo — replace with real AI integration later
        const reply: Msg = { id: 'r' + Date.now(), role: 'assistant', text: `Echo: ${userMsg.text}` }
        setTimeout(() => setMessages((m) => [...m, reply]), 300)
    }

    function onFileChange(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files || files.length === 0) return
        const names = Array.from(files).map((f) => f.name)
        setDocs((d) => [...d, ...names])
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    function addLink() {
        if (!linkInput.trim()) return
        setLinks((l) => [linkInput.trim(), ...l])
        setLinkInput('')
    }

    return (
        <div className="tab-content bg-base-100 border-base-300 p-2 flex flex-col h-full">
            {/* Chat header with attachments */}
            {/* <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Assistant</div>
                <div className="flex items-center space-x-2">
                    <label className="btn btn-sm btn-ghost">
                        Attach
                        <input ref={fileInputRef} onChange={onFileChange} type="file" multiple className="hidden" />
                    </label>
                    <button
                        className="btn btn-sm btn-outline"
                        onClick={() => {
                            if (fileInputRef.current) fileInputRef.current.click()
                        }}
                    >
                        Add File
                    </button>
                </div>
            </div> */}

            {/* messages area */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3">
                {messages.map((m) => (
                    <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                        <div className={`inline-block px-3 py-2 rounded-lg ${m.role === 'user' ? 'bg-primary text-white' : 'bg-base-200'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* input + controls */}
            <div className="mt-3">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message"
                        className="input input-bordered flex-1"
                    />
                    <button className="btn btn-primary" onClick={sendMessage}>
                        Send
                    </button>
                </div>
                {/* <div className="mt-3">
                    <div className="text-sm font-medium mb-2">Knowledge attachments</div>
                    <div className="flex gap-2">
                        <input
                            value={linkInput}
                            onChange={(e) => setLinkInput(e.target.value)}
                            placeholder="Paste a link and press Add"
                            className="input input-sm input-bordered flex-1"
                        />
                        <button className="btn btn-sm" onClick={addLink}>
                            Add
                        </button>
                    </div>

                    <div className="mt-2">
                        {links.length > 0 && (
                            <div className="mb-2">
                                <div className="text-xs font-medium">Links</div>
                                <ul className="list-disc list-inside">
                                    {links.map((l, i) => (
                                        <li key={i} className="truncate max-w-full">
                                            <a className="link" href={l} target="_blank" rel="noreferrer">
                                                {l}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {docs.length > 0 && (
                            <div>
                                <div className="text-xs font-medium">Documents</div>
                                <ul className="list-disc list-inside">
                                    {docs.map((d, i) => (
                                        <li key={i} className="truncate max-w-full">{d}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div> */}

            </div>
        </div>
    )
}
