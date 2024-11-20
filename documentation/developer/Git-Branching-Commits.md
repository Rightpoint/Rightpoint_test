# Git Branching & Commits

# Branch Pattern

Let's use an ultra-light [GitHub flow](https://guides.github.com/introduction/flow/) branching process.

> [Comprehensive Github Flow Docs](https://docs.github.com/en/get-started/quickstart/github-flow)

You are not required to use `feature/x` or `hotfix/y` branches, but you may, if it increases legibility.

> There's only one rule: anything in the main branch is always deployable.

A note on the ubiquitous `git-flow` in 2020, and why it shouldn't be applied to all projects.

> If your team is doing continuous delivery of software, I would suggest to adopt a much simpler workflow (like GitHub flow) instead of trying to shoehorn git-flow into your team. [(Source)](https://nvie.com/posts/a-successful-git-branching-model/)

# Commit messages

No clear commit message pattern, except to read the following resource, and use descriptive commit message.

The most important one is #5 -- use the imperative mood in the commit message.
https://chris.beams.io/posts/git-commit/#imperative

## The seven rules of a great Git commit message

Keep in mind: This has all been said before.

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. **Use the imperative mood in the subject line**
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

Source: https://chris.beams.io/posts/git-commit/

### Good example

        $ git log --oneline -5 --author pwebb --before "Sat Aug 30 2014"

        5ba3db6 Fix failing CompositePropertySourceTests
        84564a0 Rework @PropertySource early parsing logic
        e142fd1 Add tests for ImportSelector meta-data
        887815f Update docbook dependency and generate epub
        ac8326d Polish mockito usage

### Bad example

        $ git log --oneline -5 --author cbeams --before "Fri Mar 26 2009"

        e5f4b49 Re-adding ConfigurationPostProcessorTests after its brief removal in r814. @Ignore-ing the testCglibClassesAreLoadedJustInTimeForEnhancement() method as it turns out this was one of the culprits in the recent build breakage. The classloader hacking causes subtle downstream effects, breaking unrelated tests. The test method is still useful, but should only be run on a manual basis to ensure CGLIB is not prematurely classloaded, and should not be run as part of the automated build.
        2db0f12 fixed two build-breaking issues: + reverted ClassMetadataReadingVisitor to revision 794 + eliminated ConfigurationPostProcessorTests until further investigation determines why it causes downstream tests to fail (such as the seemingly unrelated ClassPathXmlApplicationContextTests)
        147709f Tweaks to package-info.java files
        22b25e0 Consolidated Util and MutableAnnotationUtils classes into existing AsmUtils
        7f96f57 polishing
