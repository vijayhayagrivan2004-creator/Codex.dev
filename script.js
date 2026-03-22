document.addEventListener("DOMContentLoaded", () => {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        
        question.addEventListener("click", () => {
            // Check if current item is active
            const isActive = item.classList.contains("active");
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove("active");
                faq.querySelector(".faq-answer").style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add("active");
                const answer = item.querySelector(".faq-answer");
                // dynamically set max height based on content
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Initialize the first FAQ item to ensure the CSS max-height transition works
    const firstActiveFaq = document.querySelector(".faq-item.active .faq-answer");
    if(firstActiveFaq) {
        firstActiveFaq.style.maxHeight = firstActiveFaq.scrollHeight + "px";
    }
});