import React, { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import StoryForm from "./components/StoryForm";
import StoryList from "./components/StoryList";
import { Project } from "./models/Project";
import { Story } from "./models/Story";
import { ProjectService } from "./services/ProjectService";
import { StoryService } from "./services/StoryService";
import { Container, Typography, Grid, Paper, AppBar, Box } from "@mui/material";
import ModeSwitcher from "./components/ModeSwitcher";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  );
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | undefined>(
    undefined
  );
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setProjects(ProjectService.getProjects());
    const activeProject = ProjectService.getActiveProject();
    if (activeProject) {
      setCurrentProject(activeProject);
      setStories(StoryService.getStoriesByProject(activeProject.id));
    }
  }, []);

  const handleProjectSave = () => {
    setProjects(ProjectService.getProjects());
    setCurrentProject(undefined);
  };

  const handleProjectEdit = (project: Project) => {
    setCurrentProject(project);
  };

  const handleProjectDelete = (id: string) => {
    ProjectService.deleteProject(id);
    setProjects(ProjectService.getProjects());
    setCurrentProject(undefined);
    setStories([]);
  };

  const handleStorySave = () => {
    if (currentProject) {
      setStories(StoryService.getStoriesByProject(currentProject.id));
      setCurrentStory(undefined);
    }
  };

  const handleStoryEdit = (story: Story) => {
    setCurrentStory(story);
  };

  const handleStoryDelete = (id: string) => {
    StoryService.deleteStory(id);
    if (currentProject) {
      setStories(StoryService.getStoriesByProject(currentProject.id));
    }
  };

  const handleProjectSelect = (project: Project) => {
    ProjectService.setActiveProject(project.id);
    setCurrentProject(project);
    setStories(StoryService.getStoriesByProject(project.id));
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "primary.main",
          color: "text.primary",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
          flexDirection: "row",
        }}
        id="header"
      >
        <Typography variant="h3">ManagMe</Typography>
        <Box>
          <ModeSwitcher />
          {logged && <Logout setLogged={setLogged} />}
        </Box>
      </AppBar>
      <Container
        id="main-wrapper"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1em"
        }}
      >
        {!logged && <LoginForm setLogged={setLogged} />}
        {logged && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <ProjectForm
                  project={currentProject}
                  onSave={handleProjectSave}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2 }}>
                <ProjectList
                  projects={projects}
                  onEdit={handleProjectEdit}
                  onDelete={handleProjectDelete}
                  onSelect={handleProjectSelect}
                />
              </Paper>
            </Grid>
            {currentProject && (
              <>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ padding: 2 }}>
                    <StoryForm story={currentStory} onSave={handleStorySave} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ padding: 2 }}>
                    <StoryList
                      stories={stories}
                      onEdit={handleStoryEdit}
                      onDelete={handleStoryDelete}
                    />
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default App;
