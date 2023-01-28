# fresh project

### Usage

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

In order for the Github Action workflows to function as intended, it is important to ensure that the "static" directory is only pushed to by git automation. To accomplish this, please add the directory to your .`git/info/exclude` file, so that it is ignored by your local git repository.
