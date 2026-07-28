'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import Focus from '@tiptap/extension-focus'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CharacterCount from '@tiptap/extension-character-count'
import Typography from '@tiptap/extension-typography'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  Palette,
  Minus,
  CheckSquare,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TipTapEditorProps {
  content: string
  onChange: (html: string, json?: Record<string, unknown>) => void
  placeholder?: string
}

/* ── Toolbar button ────────────────────────────────────────────────── */

function ToolbarButton({
  icon: Icon,
  onClick,
  active = false,
  label,
}: {
  icon: LucideIcon
  onClick: () => void
  active?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'rounded-md p-1.5 transition-colors',
        active
          ? 'bg-sage-100 text-sage-700'
          : 'text-gray-500 hover:bg-canvas-100 hover:text-gray-700'
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  )
}

/* ── Divider ───────────────────────────────────────────────────────── */

function ToolbarDivider() {
  return <div className="mx-0.5 h-5 w-px bg-canvas-200" />
}

/* ── Main component ───────────────────────────────────────────────── */

export function TipTapEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
}: TipTapEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const prevContentRef = useRef(content)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Image.configure({ inline: false }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-sage-600 underline underline-offset-2 hover:text-sage-700',
        },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Typography,
      HorizontalRule,
      Dropcursor,
      Gapcursor,
      Focus.configure({ className: 'ring-2 ring-sage-200 rounded-lg' }),
      TaskList,
      TaskItem.configure({ nested: true }),
      CharacterCount,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const json = editor.getJSON()
      onChange(html, json as Record<string, unknown>)
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none focus:outline-none min-h-[400px] px-4 py-4',
      },
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Sync content from props to editor when it changes externally
  useEffect(() => {
    if (editor && content && content !== prevContentRef.current) {
      prevContentRef.current = content
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content)
      }
    }
  }, [editor, content])

  // Close color picker on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setShowColorPicker(false)
      }
    }
    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:')
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const setLink = useCallback(() => {
    if (!editor) return
    if (showLinkInput && linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run()
      setShowLinkInput(false)
      setLinkUrl('')
    } else {
      const previousUrl = editor.getAttributes('link').href
      setLinkUrl(previousUrl || '')
      setShowLinkInput(!showLinkInput)
    }
  }, [editor, showLinkInput, linkUrl])

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run()
      setShowLinkInput(false)
      setLinkUrl('')
    }
  }, [editor])

  const setColor = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setColor(color).run()
        setShowColorPicker(false)
      }
    },
    [editor]
  )

  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc',
    '#d73a49', '#e36209', '#f66a0a', '#ffd33d', '#28a745', '#79b8ff',
    '#0366d6', '#6f42c1', '#563d7c', '#705c9c',
  ]

  if (!isMounted || !editor) {
    return (
      <div className="min-h-[400px] animate-pulse rounded-lg border bg-canvas-50" />
    )
  }

  const charCount = editor.storage.characterCount?.characters?.() ?? 0
  const wordCount = editor.storage.characterCount?.words?.() ?? 0

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b bg-canvas-50/50 px-3 py-2">
        {/* History */}
        <ToolbarButton icon={Undo} onClick={() => editor.chain().focus().undo().run()} label="Undo" />
        <ToolbarButton icon={Redo} onClick={() => editor.chain().focus().redo().run()} label="Redo" />
        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          icon={Heading1}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          label="Heading 1"
        />
        <ToolbarButton
          icon={Heading2}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          label="Heading 2"
        />
        <ToolbarButton
          icon={Heading3}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          label="Heading 3"
        />
        <ToolbarDivider />

        {/* Text formatting */}
        <ToolbarButton
          icon={Bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          label="Bold"
        />
        <ToolbarButton
          icon={Italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          label="Italic"
        />
        <ToolbarButton
          icon={UnderlineIcon}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          label="Underline"
        />
        <ToolbarButton
          icon={Strikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          label="Strikethrough"
        />
        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          icon={List}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          label="Bullet list"
        />
        <ToolbarButton
          icon={ListOrdered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          label="Ordered list"
        />
        <ToolbarButton
          icon={CheckSquare}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          active={editor.isActive('taskList')}
          label="Task list"
        />
        <ToolbarDivider />

        {/* Block elements */}
        <ToolbarButton
          icon={Quote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          label="Blockquote"
        />
        <ToolbarButton
          icon={Code}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          label="Code block"
        />
        <ToolbarButton
          icon={Code2}
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          label="Inline code"
        />
        <ToolbarDivider />

        {/* Alignment */}
        <ToolbarButton
          icon={AlignLeft}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
          label="Align left"
        />
        <ToolbarButton
          icon={AlignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
          label="Align center"
        />
        <ToolbarButton
          icon={AlignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
          label="Align right"
        />
        <ToolbarDivider />

        {/* Insertions */}
        <ToolbarButton
          icon={LinkIcon}
          onClick={setLink}
          active={editor.isActive('link')}
          label="Link"
        />
        <ToolbarButton
          icon={ImageIcon}
          onClick={addImage}
          label="Image"
        />
        <ToolbarButton
          icon={Minus}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Horizontal rule"
        />

        {/* Color */}
        <div className="relative" ref={colorPickerRef}>
          <ToolbarButton
            icon={Palette}
            onClick={() => setShowColorPicker(!showColorPicker)}
            active={showColorPicker}
            label="Text color"
          />
          {showColorPicker && (
            <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border bg-white p-2 shadow-lg">
              <div className="grid grid-cols-4 gap-1">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className="h-6 w-6 rounded border border-canvas-200 hover:scale-110"
                    style={{ backgroundColor: c }}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <ToolbarButton
          icon={Highlighter}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive('highlight')}
          label="Highlight"
        />
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="flex items-center gap-2 border-b bg-blue-50/50 px-4 py-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 rounded border px-3 py-1.5 text-sm focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20"
            autoFocus
          />
          <button
            type="button"
            onClick={setLink}
            className="rounded bg-sage-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sage-700"
          >
            {editor?.getAttributes('link').href ? 'Update' : 'Add'}
          </button>
          {editor?.getAttributes('link').href && (
            <button
              type="button"
              onClick={removeLink}
              className="rounded bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
            >
              Remove
            </button>
          )}
        </div>
      )}



      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Character count */}
      <div className="flex items-center justify-between border-t bg-canvas-50/50 px-4 py-1.5">
        <p className="text-xs text-gray-400">{charCount} characters</p>
        <p className="text-xs text-gray-400">{wordCount} words</p>
      </div>
    </div>
  )
}
