const GITHUB_API = 'https://api.github.com'
const OWNER = 'ywtuzi'
const REPO = 'ywtuzi.github.io'
const BLOG_PATH = ''

function apiUrl(path) {
  const parts = [GITHUB_API, 'repos', OWNER, REPO, 'contents']
  if (BLOG_PATH) parts.push(BLOG_PATH)
  parts.push(path)
  return parts.filter(Boolean).join('/')
}

function getToken() {
  return localStorage.getItem('github_token') || ''
}

function headers() {
  const token = getToken()
  return token
    ? { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
    : { Accept: 'application/vnd.github.v3+json' }
}

// 获取文件列表
export async function listFiles(path) {
  const res = await fetch(apiUrl(path), { headers: headers() })
  if (!res.ok) throw new Error(`获取文件列表失败: ${res.status}`)
  return res.json()
}

// 获取文件内容（返回 base64 解码后的内容）
export async function getFile(path) {
  const res = await fetch(apiUrl(path), { headers: headers() })
  if (!res.ok) throw new Error(`获取文件失败: ${res.status}`)
  const data = await res.json()
  return {
    content: decodeURIComponent(escape(atob(data.content.replace(/\n/g, '')))),
    sha: data.sha,
    path: data.path,
  }
}

// 创建/更新文件
export async function saveFile(path, content, sha = null) {
  const body = {
    message: `blog: update ${path}`,
    content: btoa(unescape(encodeURIComponent(content))),
    branch: 'main',
  }
  if (sha) body.sha = sha

  const res = await fetch(apiUrl(path), {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`保存文件失败: ${res.status}`)
  return res.json()
}

// 删除文件
export async function deleteFile(path, sha) {
  const res = await fetch(apiUrl(path), {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({
      message: `blog: delete ${path}`,
      sha,
      branch: 'main',
    }),
  })
  if (!res.ok) throw new Error(`删除文件失败: ${res.status}`)
  return res.json()
}

// 列出所有文章（Markdown 文件）
export async function listPosts() {
  const files = await listFiles('posts')
  const posts = []
  for (const file of files) {
    if (file.name.endsWith('.md') && file.type === 'file') {
      posts.push({
        name: file.name,
        path: file.path,
        url: file.download_url,
        sha: file.sha,
      })
    }
  }
  return posts
}

// 验证 token 有效性
export async function validateToken() {
  try {
    const res = await fetch(`${GITHUB_API}/user`, { headers: headers() })
    return res.ok
  } catch {
    return false
  }
}
