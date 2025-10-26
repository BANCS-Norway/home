# Project Setup - Install Slash Commands

Help the user install optional slash command templates interactively.

## Steps to Execute

1. **Check if .claude/commands/ directory exists**
   - Run: `ls -la .claude/commands/ 2>/dev/null || echo "Directory does not exist"`
   - If it doesn't exist, create it: `mkdir -p .claude/commands/`

2. **Scan available templates**
   - Run: `ls -1 .claude/commands-templates/*.md | grep -v README.md`
   - This shows all available template files

3. **Present installation options to user**
   - Use AskUserQuestion tool with multiSelect: true
   - Show each template with description and let user select multiple:

   **Question**: "Which slash commands would you like to install?"
   **Header**: "Commands"
   **multiSelect**: true

   **Options**:
   - **workflow** - "Quick 3-phase workflow reference"
   - **new-feature** - "Interactive feature starter (creates issue, branch, worktree)"
   - **git-safety** - "Git safety rules and guidelines reminder"
   - **worktree** - "Worktree workflow guide (optional, for worktree users)"
   - **cleanup** - "Clean up worktree after merge (optional, for worktree users)"

4. **Install selected commands**
   - For each selected command, copy the template:
     ```bash
     cp .claude/commands-templates/{command}.md .claude/commands/
     ```
   - Show progress: "Installing {command}..."

5. **Verify installation**
   - Run: `ls -1 .claude/commands/`
   - Show user which commands were installed

6. **Provide next steps**
   - Tell user: "Commands installed successfully! You can now use:"
   - List each installed command with `/command-name` format
   - Remind: "Type `/` in Claude Code to see all available commands"
   - Suggest: "You can customize these commands by editing the files in `.claude/commands/`"

## Example Flow

```bash
# Create commands directory if needed
mkdir -p .claude/commands/

# User selects: workflow, new-feature, git-safety
cp .claude/commands-templates/workflow.md .claude/commands/
cp .claude/commands-templates/new-feature.md .claude/commands/
cp .claude/commands-templates/git-safety.md .claude/commands/

# Verify
ls -1 .claude/commands/
```

## Important Notes

- This command should be in the templates folder AND copied to commands by default
- Users run `/project-setup` to install OTHER templates
- Make it clear that worktree commands are optional (only for worktree users)
- Allow users to run this command multiple times to add more templates later
- Don't overwrite existing commands without asking

## Success Message Example

```
✅ Successfully installed 3 slash commands:
   /workflow - Quick 3-phase workflow reference
   /new-feature - Interactive feature starter
   /git-safety - Git safety rules reminder

You can now use these commands in Claude Code!
Type / to see all available commands.

To customize these commands, edit the files in .claude/commands/
```
