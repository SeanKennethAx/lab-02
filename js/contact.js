(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contactForm")
        const statusMsg = document.getElementById("statusMsg")
        const clearBtn = document.getElementById("clearBtn")

        if (!form || !statusMsg) return

        const STORAGE_KEY = "contactSubmissions"

        function getSubmissions() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY)
                return raw ? JSON.parse(raw) : []
            } catch (e) {
                return []
            }
        }

        function saveSubmissions(items) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }

        function showStatus(message, ok = true) {
            statusMsg.textContent = message
            statusMsg.className = ok
                ? "mt-5 text-sm text-[#00D4FF]"
                : "mt-5 text-sm text-red-300"
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault()

            const data = {
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                email: form.email.value.trim(),
                contactNumber: form.contactNumber.value.trim(),
                submittedAt: new Date().toISOString(),
            }

            if (!data.firstName || !data.lastName || !data.email || !data.contactNumber) {
                showStatus("Please fill in all fields.", false)
                return
            }

            const submissions = getSubmissions()
            submissions.push(data)
            saveSubmissions(submissions)

            form.reset()
            showStatus("Saved! Your contact info was stored in localStorage.")
        })

        if (clearBtn) {
            clearBtn.addEventListener("click", function () {
                localStorage.removeItem(STORAGE_KEY)
                showStatus("Cleared saved submissions.")
            })
        }
    })
})()
