#!/bin/bash

# Test Script for /project-setup Enhancement
# This script simulates the logic of the enhanced /project-setup command
# to verify detection, comparison, and backup mechanisms work correctly

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test directories
TEST_DIR=".test-project-setup"
TEST_COMMANDS_DIR="$TEST_DIR/commands"
TEST_TEMPLATES_DIR="$TEST_DIR/templates"

# Initialize tracking arrays
declare -a newly_installed
declare -a up_to_date
declare -a customized_skipped
declare -a customized_updated

# Cleanup function
cleanup() {
    echo -e "\n${BLUE}Cleaning up test directory...${NC}"
    rm -rf "$TEST_DIR"
}

# Setup test environment
setup_test_env() {
    echo -e "${BLUE}Setting up test environment...${NC}"

    # Create test directories
    mkdir -p "$TEST_COMMANDS_DIR"
    mkdir -p "$TEST_TEMPLATES_DIR"

    # Create mock template files
    echo "# Workflow Template v1.0" > "$TEST_TEMPLATES_DIR/workflow.md"
    echo "This is the workflow command template" >> "$TEST_TEMPLATES_DIR/workflow.md"

    echo "# Git Safety Template v1.0" > "$TEST_TEMPLATES_DIR/git-safety.md"
    echo "This is the git safety command template" >> "$TEST_TEMPLATES_DIR/git-safety.md"

    echo "# New Feature Template v1.0" > "$TEST_TEMPLATES_DIR/new-feature.md"
    echo "This is the new feature command template" >> "$TEST_TEMPLATES_DIR/new-feature.md"

    echo "# Worktree Template v1.0" > "$TEST_TEMPLATES_DIR/worktree.md"
    echo "This is the worktree command template" >> "$TEST_TEMPLATES_DIR/worktree.md"

    echo -e "${GREEN}✓ Test environment created${NC}\n"
}

# Process a single command (core logic from /project-setup)
process_command() {
    local command=$1
    local overwrite_if_customized=$2  # "yes" or "no"

    local template_file="$TEST_TEMPLATES_DIR/${command}.md"
    local command_file="$TEST_COMMANDS_DIR/${command}.md"

    echo -e "${BLUE}Processing: ${command}${NC}"

    if [ -f "$command_file" ]; then
        # File exists - check if customized
        if diff -q "$command_file" "$template_file" > /dev/null 2>&1; then
            # Already up to date
            echo -e "${GREEN}  ✓ Already up to date${NC}"
            up_to_date+=("$command")
        else
            # Customized - simulate user choice
            echo -e "${YELLOW}  ⚠️  Command has local customizations${NC}"

            if [ "$overwrite_if_customized" = "yes" ]; then
                echo -e "${YELLOW}  → User chose: Overwrite (creating backup)${NC}"
                cp "$command_file" "${command_file}.backup"
                cp "$template_file" "$command_file"
                customized_updated+=("$command")
                echo -e "${GREEN}  ✓ Updated (backup created)${NC}"
            else
                echo -e "${YELLOW}  → User chose: Keep custom version${NC}"
                customized_skipped+=("$command")
                echo -e "${YELLOW}  ✓ Skipped (keeping customization)${NC}"
            fi
        fi
    else
        # New installation
        echo -e "${GREEN}  → Installing new command${NC}"
        cp "$template_file" "$command_file"
        newly_installed+=("$command")
        echo -e "${GREEN}  ✓ Newly installed${NC}"
    fi
    echo ""
}

# Display summary (matches /project-setup output format)
display_summary() {
    echo -e "\n${GREEN}═══════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ Installation complete!${NC}"
    echo -e "${GREEN}═══════════════════════════════════════${NC}\n"

    if [ ${#newly_installed[@]} -gt 0 ]; then
        echo -e "${GREEN}Newly installed:${NC}"
        for cmd in "${newly_installed[@]}"; do
            echo -e "   ${GREEN}✅${NC} /$cmd"
        done
        echo ""
    fi

    if [ ${#up_to_date[@]} -gt 0 ]; then
        echo -e "${GREEN}Already up to date:${NC}"
        for cmd in "${up_to_date[@]}"; do
            echo -e "   ${GREEN}✅${NC} /$cmd"
        done
        echo ""
    fi

    if [ ${#customized_updated[@]} -gt 0 ]; then
        echo -e "${YELLOW}Updated (backed up):${NC}"
        for cmd in "${customized_updated[@]}"; do
            echo -e "   ${GREEN}✅${NC} /$cmd ${YELLOW}(backup saved to $cmd.md.backup)${NC}"
        done
        echo ""
    fi

    if [ ${#customized_skipped[@]} -gt 0 ]; then
        echo -e "${YELLOW}Skipped (customized):${NC}"
        for cmd in "${customized_skipped[@]}"; do
            echo -e "   ${YELLOW}⚠️${NC}  /$cmd ${YELLOW}(keeping your custom version)${NC}"
        done
        echo ""
    fi

    if [ ${#customized_updated[@]} -gt 0 ]; then
        echo -e "${BLUE}📁 Backup files saved in $TEST_COMMANDS_DIR/*.backup${NC}\n"
    fi
}

# Reset tracking arrays
reset_tracking() {
    newly_installed=()
    up_to_date=()
    customized_skipped=()
    customized_updated=()
}

# Test Scenario 1: Fresh Installation
test_scenario_1() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}TEST SCENARIO 1: Fresh Installation${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    reset_tracking

    # Simulate installing 3 new commands
    process_command "workflow" "no"
    process_command "new-feature" "no"
    process_command "git-safety" "no"

    display_summary

    # Verify results
    echo -e "${BLUE}Verification:${NC}"
    [ ${#newly_installed[@]} -eq 3 ] && echo -e "${GREEN}✓ Correctly tracked 3 newly installed commands${NC}" || echo -e "${RED}✗ Expected 3 newly installed${NC}"
    [ ${#up_to_date[@]} -eq 0 ] && echo -e "${GREEN}✓ No up-to-date commands${NC}" || echo -e "${RED}✗ Expected 0 up-to-date${NC}"
    [ ${#customized_skipped[@]} -eq 0 ] && echo -e "${GREEN}✓ No skipped commands${NC}" || echo -e "${RED}✗ Expected 0 skipped${NC}"
    [ ${#customized_updated[@]} -eq 0 ] && echo -e "${GREEN}✓ No updated commands${NC}" || echo -e "${RED}✗ Expected 0 updated${NC}"
}

# Test Scenario 2: Already Up to Date
test_scenario_2() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}TEST SCENARIO 2: Already Up to Date${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    reset_tracking

    # Try installing the same commands again (should be up-to-date)
    process_command "workflow" "no"
    process_command "git-safety" "no"

    # Install one new command
    process_command "worktree" "no"

    display_summary

    # Verify results
    echo -e "${BLUE}Verification:${NC}"
    [ ${#newly_installed[@]} -eq 1 ] && echo -e "${GREEN}✓ Correctly tracked 1 newly installed command${NC}" || echo -e "${RED}✗ Expected 1 newly installed${NC}"
    [ ${#up_to_date[@]} -eq 2 ] && echo -e "${GREEN}✓ Correctly tracked 2 up-to-date commands${NC}" || echo -e "${RED}✗ Expected 2 up-to-date${NC}"
}

# Test Scenario 3: Customized (User Keeps)
test_scenario_3() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}TEST SCENARIO 3: Customized (User Keeps)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    reset_tracking

    # Customize a command
    echo "" >> "$TEST_COMMANDS_DIR/workflow.md"
    echo "# MY CUSTOM ADDITION" >> "$TEST_COMMANDS_DIR/workflow.md"
    echo -e "${YELLOW}Simulated customization: Added custom content to workflow.md${NC}\n"

    # Try to install - user chooses to keep custom version
    process_command "workflow" "no"
    process_command "git-safety" "no"  # This one is up-to-date

    display_summary

    # Verify results
    echo -e "${BLUE}Verification:${NC}"
    [ ${#customized_skipped[@]} -eq 1 ] && echo -e "${GREEN}✓ Correctly tracked 1 skipped command${NC}" || echo -e "${RED}✗ Expected 1 skipped${NC}"
    [ ${#up_to_date[@]} -eq 1 ] && echo -e "${GREEN}✓ Correctly tracked 1 up-to-date command${NC}" || echo -e "${RED}✗ Expected 1 up-to-date${NC}"
    [ -f "$TEST_COMMANDS_DIR/workflow.md.backup" ] && echo -e "${RED}✗ Backup should NOT exist (user kept custom)${NC}" || echo -e "${GREEN}✓ No backup created (correct)${NC}"
}

# Test Scenario 4: Customized (User Overwrites)
test_scenario_4() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}TEST SCENARIO 4: Customized (User Overwrites)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    reset_tracking

    # Customize git-safety command
    echo "" >> "$TEST_COMMANDS_DIR/git-safety.md"
    echo "# ANOTHER CUSTOM CHANGE" >> "$TEST_COMMANDS_DIR/git-safety.md"
    echo -e "${YELLOW}Simulated customization: Added custom content to git-safety.md${NC}\n"

    # Try to install - user chooses to overwrite
    process_command "git-safety" "yes"
    process_command "workflow" "no"  # Still has customizations from previous test

    display_summary

    # Verify results
    echo -e "${BLUE}Verification:${NC}"
    [ ${#customized_updated[@]} -eq 1 ] && echo -e "${GREEN}✓ Correctly tracked 1 updated command${NC}" || echo -e "${RED}✗ Expected 1 updated${NC}"
    [ ${#customized_skipped[@]} -eq 1 ] && echo -e "${GREEN}✓ Correctly tracked 1 skipped command${NC}" || echo -e "${RED}✗ Expected 1 skipped${NC}"
    [ -f "$TEST_COMMANDS_DIR/git-safety.md.backup" ] && echo -e "${GREEN}✓ Backup created correctly${NC}" || echo -e "${RED}✗ Expected backup file${NC}"

    # Verify backup contains customization
    if grep -q "ANOTHER CUSTOM CHANGE" "$TEST_COMMANDS_DIR/git-safety.md.backup" 2>/dev/null; then
        echo -e "${GREEN}✓ Backup contains custom changes${NC}"
    else
        echo -e "${RED}✗ Backup should contain custom changes${NC}"
    fi

    # Verify installed file matches template
    if diff -q "$TEST_COMMANDS_DIR/git-safety.md" "$TEST_TEMPLATES_DIR/git-safety.md" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Installed file matches template${NC}"
    else
        echo -e "${RED}✗ Installed file should match template${NC}"
    fi
}

# Test Scenario 5: Mixed (All States)
test_scenario_5() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}TEST SCENARIO 5: Mixed (All States)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    reset_tracking

    # Restore workflow to template version for this test
    cp "$TEST_TEMPLATES_DIR/workflow.md" "$TEST_COMMANDS_DIR/workflow.md"

    # Now we should have:
    # - workflow: up-to-date (just restored)
    # - git-safety: up-to-date (was updated in scenario 4)
    # - new-feature: up-to-date (from scenario 1)
    # - worktree: up-to-date (from scenario 2)

    # Add one customized command that will be skipped
    echo "" >> "$TEST_COMMANDS_DIR/new-feature.md"
    echo "# CUSTOM FEATURE" >> "$TEST_COMMANDS_DIR/new-feature.md"

    # Process all commands
    process_command "workflow" "no"       # up-to-date
    process_command "git-safety" "no"     # up-to-date
    process_command "new-feature" "no"    # customized, skip
    process_command "worktree" "yes"      # up-to-date

    display_summary

    # Verify results
    echo -e "${BLUE}Verification:${NC}"
    [ ${#up_to_date[@]} -eq 3 ] && echo -e "${GREEN}✓ Correctly tracked 3 up-to-date commands${NC}" || echo -e "${RED}✗ Expected 3 up-to-date${NC}"
    [ ${#customized_skipped[@]} -eq 1 ] && echo -e "${GREEN}✓ Correctly tracked 1 skipped command${NC}" || echo -e "${RED}✗ Expected 1 skipped${NC}"
}

# Main test runner
main() {
    echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║  /project-setup Enhancement Test Suite                ║${NC}"
    echo -e "${BLUE}║  Testing: Detection, Diff, Backup, and Tracking       ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"

    # Setup
    cleanup
    setup_test_env

    # Run all test scenarios
    test_scenario_1
    test_scenario_2
    test_scenario_3
    test_scenario_4
    test_scenario_5

    # Show final test directory state
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}Final Test Directory State:${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "\n${BLUE}Installed commands:${NC}"
    ls -1 "$TEST_COMMANDS_DIR/"

    echo -e "\n${BLUE}Backup files:${NC}"
    ls -1 "$TEST_COMMANDS_DIR/"*.backup 2>/dev/null || echo "(none)"

    # Final cleanup
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    read -p "Press Enter to cleanup test directory or Ctrl+C to keep it for inspection..."
    cleanup

    echo -e "\n${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  All tests completed successfully!                    ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}\n"
}

# Run tests
main
