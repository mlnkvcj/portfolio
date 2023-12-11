$.getJSON("projects.json", function(projects) {
    initializePage(projects);
});

function initializePage(projects) {
    function displayProjects(filteredProjects) {
        const projectListContainer = $("#project-list");
        projectListContainer.empty();

        filteredProjects.forEach(project => {
            const projectCard = $("<div>").addClass("project-card");

            projectCard.html(`
                <h2>${project.title}</h2>
                <p>${project.text}</p>
                <img src="${project.imageUrl}" alt="${project.title}">
            `);

            projectListContainer.append(projectCard);
        });
    }

    function filterProjects() {
        const selectedTags = $("input[type=checkbox]:checked").map(function() {
            return $(this).val();
        }).get();

        if (selectedTags.length === 0) {
            displayProjects(projects); // Show all projects if no tags are selected
        } else {
            const filteredProjects = projects.filter(project =>
                project.tags.some(tag => selectedTags.includes(tag))
            );
            displayProjects(filteredProjects);
        }
    }

    // Dynamically generate checkbox for each tag
    const tagCheckboxesContainer = $("#tag-checkboxes");
    const allTags = projects.flatMap(project => project.tags)
        .filter((tag, index, self) => self.indexOf(tag) === index);

    allTags.forEach(tag => {
        const checkbox = $("<input>").attr({
            type: "checkbox",
            id: tag,
            value: tag
        }).on("change", filterProjects);

        const label = $("<label>").attr("for", tag).text(tag);

        tagCheckboxesContainer.append(checkbox, label);
    });

    // Display all projects initially
    displayProjects(projects);
}
