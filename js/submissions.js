(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const STORAGE_KEY = "contactSubmissions"
        const tableBody = document.getElementById("tableBody")
        const statusMsg = document.getElementById("statusMsg")
        const refreshBtn = document.getElementById("refreshBtn")
        const clearBtn = document.getElementById("clearBtn")

        if (!tableBody || !statusMsg || !refreshBtn || !clearBtn) return

        function formatDate(iso) {
            if (!iso) return ""
            const d = new Date(iso)
            if (isNaN(d.getTime())) return iso
            return d.toLocaleString()
        }

        function getSubmissions() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY)
                const parsed = raw ? JSON.parse(raw) : []
                return Array.isArray(parsed) ? parsed : []
            } catch (e) {
                return []
            }
        }

        function renderTable() {
            const submissions = getSubmissions()
            tableBody.innerHTML = ""

            if (submissions.length === 0) {
                tableBody.innerHTML = `
          <tr>
            <td class="px-5 py-5 text-white/70" colspan="6">
              No saved submissions yet. Go to <a class="text-[#00D4FF] underline" href="contact.html">Contact</a> and submit the form.
            </td>
          </tr>
        `
                statusMsg.textContent = "0 submissions found."
                return
            }

            const rows = submissions.map((item, idx) => {
                const firstName = (item.firstName ?? "").toString()
                const lastName = (item.lastName ?? "").toString()
                const email = (item.email ?? "").toString()
                const contactNumber = (item.contactNumber ?? "").toString()
                const submittedAt = formatDate(item.submittedAt)

                return `
          <tr class="hover:bg-white/5 transition">
            <td class="px-5 py-4 text-sm text-white/80">${idx + 1}</td>
            <td class="px-5 py-4 text-sm">${firstName}</td>
            <td class="px-5 py-4 text-sm">${lastName}</td>
            <td class="px-5 py-4 text-sm">
              <a class="text-[#00D4FF] hover:underline" href="mailto:${email}">${email}</a>
            </td>
            <td class="px-5 py-4 text-sm">${contactNumber}</td>
            <td class="px-5 py-4 text-sm text-white/80">${submittedAt}</td>
          </tr>
        `
            })

            tableBody.innerHTML = rows.join("")
            statusMsg.textContent = `${submissions.length} submission(s) found.`
        }

        refreshBtn.addEventListener("click", renderTable)

        clearBtn.addEventListener("click", function () {
            localStorage.removeItem(STORAGE_KEY)
            renderTable()
            statusMsg.textContent = "Cleared saved submissions."
        })
        renderTable()
    })
})()
