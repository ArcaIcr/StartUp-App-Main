import { defineStore } from 'pinia';

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    activeProject: null,
    workspaceConfig: {
      layout: 'default',
      theme: 'light',
      sidebarCollapsed: false
    },
    recentActivities: [],
    sharedResources: [],
    collaborators: [],
    templates: []
  }),

  getters: {
    currentProject: (state) => state.activeProject,
    availableTemplates: (state) => {
      return (userRole) => state.templates.filter(template => 
        template.roles.includes(userRole) || template.roles.includes('all')
      );
    },
    projectCollaborators: (state) => state.collaborators,
  },

  actions: {
    async setActiveProject(project) {
      this.activeProject = project;
      this.trackActivity('project_switch', { projectId: project.id });
    },

    async saveWorkspaceState() {
      // Save current workspace state to backend
      try {
        await api.workspace.save({
          projectId: this.activeProject?.id,
          config: this.workspaceConfig,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Failed to save workspace state:', error);
      }
    },

    async shareResource(resource, collaborators) {
      // Implementation for resource sharing
      this.sharedResources.push({
        ...resource,
        sharedWith: collaborators,
        sharedAt: new Date().toISOString()
      });
    },

    trackActivity(type, details) {
      this.recentActivities.unshift({
        type,
        details,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 50 activities
      if (this.recentActivities.length > 50) {
        this.recentActivities.pop();
      }
    }
  }
});
