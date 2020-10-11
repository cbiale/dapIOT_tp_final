cmd_Release/siridb.node := ln -f "Release/obj.target/siridb.node" "Release/siridb.node" 2>/dev/null || (rm -rf "Release/siridb.node" && cp -af "Release/obj.target/siridb.node" "Release/siridb.node")
