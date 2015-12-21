var docTests = [
  {
    id: "oldURLs",
    name: "Old 'en/' URLs",
    desc: "en/ -> /en-US/docs/",
    regex: "\\shref=\"\\/*en*\/",
    count: 0
  },
  {
    id: "emptyElem",
    name: "Empty elements",
    desc: "E.g. <p></p>",
    regex: "(<(?!\\/)[^>]+>)+([\\s]*?)(<\\/[^>]+>)+",
    count: 0
  },
  {
    id: "languagesMacro",
    name: "Languages macro",
    desc: "{{languages()}}",
    regex: "{{\\s*languages\\s*",
    count: 0
  },
  {
    id: "emptyBrackets",
    name: "Empty brackets",
    desc: "{{foo()}}",
    regex: "{{\\s*[a-z]*\\(\\)\\s*}}",
    count: 0
  },
  {
    id: "styleAttribute",
    name: "Style attributes",
    desc: "style=",
    regex: "style=[\"'][a-zA-Z0-9:#!%;'\\.\\s\\(\\)\\-\\,]*['\"]",
    count: 0
  },
  {
    id: "nameAttribute",
    name: "Name attributes",
    desc: "name=",
    regex: "name=[\"'][a-zA-Z0-9:#!%;'_\\.\\s\\(\\)\\-\\,]*['\"]",
    count: 0
  },
  {
    id: "spanCount",
    name: "# of &lt;span&gt; elements",
    desc: "<span></span>",
    check: function check(content) {
      var matches = content.match(/<span.*?>.*?<\/span>/gi) || [];
      for (var i = 0; i < matches.length; i++) {
        if (matches[i].match(/<span[^>]*?class="seoSummary"/)) {
          matches.splice(i, 1);
        }
      }

      return matches;
    },
    count: 0
  },
  {
    id: "preWithoutClass",
    name: "&lt;pre&gt; w/o class",
    desc: "<pre></pre> (no syntax highlighter)",
    regex: "(<pre(?=\\s|>)(?!(?:[^>=]|=(['\"])(?:(?!\\1).)*\\1)*?class=['\"])[^>]*>[\\S\\s]*?<\\/pre>)",
    count: 0
  },
  {
    id: "SummaryHeading",
    name: "Summary heading",
    desc: "According to the article style guide there shouldn't be a <hx>Summary</hx> heading.",
    regex: "<h[0-6]?(?!\\/)[^>]+>Summary<\\/h[0-6]>",
    count: 0
  },
  {
    id: "jsRefWithParams",
    name: "JSRef params",
    desc: "Paremeters are obsolete now, e.g. {{JSRef('Global_Objects', 'Math')}}",
    regex: "{{s*JSRef\\(s*",
    count: 0
  },
  {
    id: "ExampleColonHeading",
    name: "'Example:' heading",
    desc: "<h3>Example: Foobar</h3> just use <h3>Foobar</h3>",
    regex: "<h[0-6]?(?!\\/)[^>]+>Example:.*?<\\/h[0-6]>",
    count: 0
  },
  {
    id: "alertPrintInCode",
    name: "alert, print, eval, d.write",
    desc: "Don't use alert, print, eval, document.write in code samples",
    regex: "(alert|print|eval|document\\.write)",
    count: 0
  },
  {
    id: "htmlComments",
    name: "HTML comments",
    desc: "HTML comments are not visible in wysiwyg mode and in reading mode. Not meant to comment the documentation",
    regex: "<!--[\\s\\S]*?-->",
    count: 0
  },
  {
    id: "fontElement",
    name: "&lt;font&gt; element",
    desc: "Using <font> elements is obsolete. Either the tag should be removed completely or replaced by CSS.",
    regex: "<font.*?>",
    count: 0
  }
];