# Slash Command Templates

This directory contains optional slash command templates that you can install to enhance your Claude Code workflow.

## What are Slash Commands?

Slash commands are custom prompts that you can invoke in Claude Code using the `/command-name` syntax. They help automate common workflows and provide quick reference to project guidelines.

## Installation

### Interactive Setup (Recommended)

The easiest way to install commands is using the interactive setup command that's already included with this project:

1. **Run the setup command in Claude Code**:
   ```
   /project-setup
   ```

2. **Select the commands you want** from the interactive checklist

3. **Done!** The selected commands are now available in Claude Code

The `/project-setup` command is pre-installed and ready to use immediately when you clone this repository.

### Manual Installation

If you prefer manual installation:

#### Quick Install (All Commands)

```bash
# From the repository root
mkdir -p .claude/commands/
cp .claude/commands-templates/*.md .claude/commands/
```

#### Selective Install (Individual Commands)

```bash
# Example: Install just the workflow command
cp .claude/commands-templates/workflow.md .claude/commands/

# Example: Install worktree-related commands
cp .claude/commands-templates/{worktree,new-feature,cleanup}.md .claude/commands/
```

### Verify Installation

After installation, you can see your available commands by typing `/` in Claude Code and viewing the autocomplete list.

## Available Commands

### Pre-Installed

- **`/project-setup`** - Interactive installer for slash commands (PRE-INSTALLED!)
  - Already available in `.claude/commands/project-setup.md`
  - Shows all available templates with descriptions
  - Multi-select checkbox interface
  - Automatically copies selected commands to `.claude/commands/`
  - Just run: `/project-setup` to get started!

### Workflow Templates

- **`workflow.md`** - Quick reference to the 3-phase development workflow
  - Shows Issue-First workflow, batch development, and completion phases
  - Use: `/workflow`

- **`new-feature.md`** - Interactive helper to start new feature work
  - Creates issues, feature branches, and worktrees
  - Adds status labels automatically
  - Use: `/new-feature`

- **`new-blog-post.md`** - Interactive helper to create new blog posts
  - Creates blog post file with template
  - Sets up examples directory
  - **Automatically updates blog index** (critical step!)
  - Provides checklist for completion
  - Use: `/new-blog-post`

### Git Commands

- **`git-safety.md`** - Git safety rules and guidelines reminder
  - Shows what Claude will/won't do with Git
  - Push/pull policies
  - Use: `/git-safety`

### Worktree Commands (Optional)

These commands are for developers who prefer using git worktrees:

- **`worktree.md`** - Personal worktree workflow reminder
  - Quick reference for worktree-based development
  - Use: `/worktree`

- **`cleanup.md`** - Clean up worktree after feature merge
  - Removes worktree and deletes local branch
  - Use: `/cleanup`

## Customization

These templates are meant to be customized! Feel free to:

1. **Modify the content** - Adjust prompts to match your workflow
2. **Create new commands** - Use these as examples for your own slash commands
3. **Combine commands** - Merge multiple templates into workflow-specific commands

### Example Customization

```bash
# Copy template to your commands directory
cp .claude/commands-templates/workflow.md .claude/commands/

# Edit to add your team-specific guidelines
nano .claude/commands/workflow.md
```

## Creating Your Own Commands

Slash commands are just markdown files in `.claude/commands/`. The file content becomes the prompt sent to Claude.

**Example**: Create `.claude/commands/my-workflow.md`

```markdown
# My Custom Workflow

When I run /my-workflow, help me:
1. Check current branch
2. Run tests
3. Show me any failing tests

Always ask before making changes.
```

## Troubleshooting

### Command not showing up?

- Verify the file is in `.claude/commands/` (not `commands-templates/`)
- Check that the file has a `.md` extension
- Restart Claude Code if needed

### Command not working as expected?

- Open the command file and review the prompt
- Adjust the instructions to be more specific
- Remember: Claude follows the prompt exactly as written

### Want to remove a command?

```bash
# Remove from your local commands
rm .claude/commands/workflow.md
```

## Best Practices

1. **Start simple** - Install one or two commands first, see what works for you
2. **Iterate** - Customize commands based on your actual usage
3. **Keep updated** - Check this directory periodically for new templates
4. **Share improvements** - If you create useful commands, consider contributing them back!

## Contributing

Have a useful slash command template to share?

1. Add it to `.claude/commands-templates/`
2. Update this README
3. Submit a PR with clear description of what the command does
4. Include example usage

## Related Documentation

- [CLAUDE.md](../../CLAUDE.md) - Main workflow documentation
- [Development Workflow](../../docs/claude/workflow.md) - Detailed workflow guide
- [Git Safety](../../docs/claude/git-safety.md) - Git safety guidelines
- [Claude Code Documentation](https://docs.claude.com/claude-code) - Official Claude Code docs
