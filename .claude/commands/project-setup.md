# Project Setup - Install Slash Commands

Help the user install optional slash command templates interactively with smart detection of existing and customized commands.

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

4. **Process each selected command with detection logic**

   For each selected command, perform these checks:

   **a) Check if command already exists:**
   ```bash
   if [ -f ".claude/commands/{command}.md" ]; then
     # File exists, check if customized
   else
     # New installation
   fi
   ```

   **b) If exists, compare with template using diff:**
   ```bash
   if diff -q .claude/commands/{command}.md .claude/commands-templates/{command}.md > /dev/null 2>&1; then
     # Files are identical - already up to date
   else
     # Files differ - command has been customized
   fi
   ```

   **c) Handle each scenario:**

   - **NEW INSTALLATION** (file doesn't exist):
     - Copy template: `cp .claude/commands-templates/{command}.md .claude/commands/`
     - Track as "newly installed"

   - **ALREADY UP TO DATE** (file exists and matches template):
     - Skip installation
     - Track as "already up to date"

   - **CUSTOMIZED** (file exists but differs from template):
     - Show warning: "⚠️ {command}.md has local customizations"
     - Use AskUserQuestion to ask: "Do you want to overwrite {command}.md? (This will lose your customizations)"
     - Options:
       - "Yes, overwrite" → Create backup, then install
       - "No, keep my version" → Skip installation

     If user chooses to overwrite:
     ```bash
     # Create backup with timestamp
     cp .claude/commands/{command}.md .claude/commands/{command}.md.backup
     # Install new version
     cp .claude/commands-templates/{command}.md .claude/commands/
     ```
     - Track as "updated (backed up)"

5. **Build installation summary**

   Create three lists based on tracking:
   - `newly_installed[]` - Commands that were just installed
   - `up_to_date[]` - Commands already installed and current
   - `customized_skipped[]` - Customized commands the user chose to keep
   - `customized_updated[]` - Customized commands that were backed up and updated

6. **Display comprehensive summary**

   Show results organized by category:

   ```
   ✅ Installation complete!

   [IF newly_installed is not empty:]
   Newly installed:
      ✅ /command-name

   [IF up_to_date is not empty:]
   Already up to date:
      ✅ /command-name

   [IF customized_updated is not empty:]
   Updated (backed up):
      ✅ /command-name (backup saved to command-name.md.backup)

   [IF customized_skipped is not empty:]
   Skipped (customized):
      ⚠️ /command-name (keeping your custom version)

   [IF any backups were created:]
   📁 Backup files saved in .claude/commands/*.backup
   ```

7. **Provide next steps**
   - Remind: "Type `/` in Claude Code to see all available commands"
   - If new commands were installed: "Try out your new commands!"
   - If customizations exist: "Your customizations have been preserved"

## Implementation Logic Flow

```bash
# Initialize tracking arrays
newly_installed=()
up_to_date=()
customized_skipped=()
customized_updated=()

# For each selected command
for command in selected_commands; do
  template_file=".claude/commands-templates/${command}.md"
  command_file=".claude/commands/${command}.md"

  if [ -f "$command_file" ]; then
    # File exists - check if customized
    if diff -q "$command_file" "$template_file" > /dev/null 2>&1; then
      # Already up to date
      up_to_date+=("$command")
    else
      # Customized - ask user
      # Use AskUserQuestion tool here
      if user_wants_to_overwrite; then
        cp "$command_file" "${command_file}.backup"
        cp "$template_file" "$command_file"
        customized_updated+=("$command")
      else
        customized_skipped+=("$command")
      fi
    fi
  else
    # New installation
    cp "$template_file" "$command_file"
    newly_installed+=("$command")
  fi
done
```

## Important Notes

- This command should be in the templates folder AND copied to commands by default
- Users can safely run `/project-setup` multiple times
- Customizations are detected and protected
- Backups are automatically created when overwriting customized commands
- Clear feedback shows exactly what happened with each command

## Example Outputs

### Scenario 1: Fresh Installation
```
✅ Installation complete!

Newly installed:
   ✅ /workflow
   ✅ /new-feature
   ✅ /git-safety

Try out your new commands! Type / to see all available commands.
```

### Scenario 2: Some Already Installed
```
✅ Installation complete!

Newly installed:
   ✅ /worktree

Already up to date:
   ✅ /workflow
   ✅ /git-safety

Type / in Claude Code to see all available commands.
```

### Scenario 3: With Customizations (User Keeps)
```
✅ Installation complete!

Newly installed:
   ✅ /cleanup

Already up to date:
   ✅ /workflow

Skipped (customized):
   ⚠️ /git-safety (keeping your custom version)

Your customizations have been preserved.
```

### Scenario 4: With Customizations (User Overwrites)
```
✅ Installation complete!

Already up to date:
   ✅ /workflow

Updated (backed up):
   ✅ /git-safety (backup saved to git-safety.md.backup)

📁 Backup files saved in .claude/commands/*.backup
```
